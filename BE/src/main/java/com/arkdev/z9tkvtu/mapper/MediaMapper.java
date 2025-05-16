package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.model.Media;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {
    public Media toMedia(MediaRequest request) {
        if (request == null) return null;
        Media media = new Media();
        media.setMediaType(request.getMediaType());
        media.setUrl(request.getUrl());
        return media;
    }

    public void updateMedia(Media media, MediaRequest request) {
        if (request == null) return;
        media.setMediaType(request.getMediaType());
        media.setUrl(request.getUrl());
    }
}
