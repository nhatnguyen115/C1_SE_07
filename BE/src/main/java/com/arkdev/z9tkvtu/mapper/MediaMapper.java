package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.model.Media;
import com.arkdev.z9tkvtu.util.MediaType;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {
    public Media toMedia(MediaType mediaType, String url) {
        if (mediaType == null || url == null) return null;
        Media media = new Media();
        media.setMediaType(mediaType);
        media.setUrl(url);
        return media;
    }
}
