package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.mapper.MediaMapper;
import com.arkdev.z9tkvtu.model.Media;
import com.arkdev.z9tkvtu.util.MediaType;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadMediaService {
    Cloudinary cloudinary;
    MediaMapper mediaMapper;

    public Media updateMedia(Media media, MultipartFile file, MediaType mediaType) throws IOException {
        if (media != null && !media.getUrl().isEmpty()) deleteMediaByUrl(media.getUrl(),
                media.getMediaType().toString());
        String url = uploadMedia(file, mediaType.toString());
        return mediaMapper.toMedia(mediaType, url);
    }

    public String uploadMedia(MultipartFile file, String resourceType) throws IOException {

            if (resourceType.equalsIgnoreCase("image")) resourceType = "image";
            else if (resourceType.equalsIgnoreCase("audio") ||
                    resourceType.equalsIgnoreCase("video")) resourceType = "video";
            else resourceType = "raw";

        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", resourceType
                ));
        return uploadResult.get("url").toString();
    }

    public void deleteMediaByUrl(String url, String resourceType) throws IOException {
        String[] parts = url.split("/");
        String fileName = parts[parts.length - 1];
        String publicId = fileName.substring(0, fileName.lastIndexOf("."));
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                "resource_type", resourceType
        ));
    }
}
