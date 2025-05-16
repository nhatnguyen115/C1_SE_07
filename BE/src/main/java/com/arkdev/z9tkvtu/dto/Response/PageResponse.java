package com.arkdev.z9tkvtu.dto.Response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    List<T> items;
    int totalPages;
    long totalElements;
    int PageNumber;
    int PageSize;

    public PageResponse(Page<T> page) {
        items = page.getContent();
        totalPages = page.getTotalPages();
        totalElements = page.getTotalElements();
        PageNumber = page.getNumber();
        PageSize = page.getSize();
    }
}
