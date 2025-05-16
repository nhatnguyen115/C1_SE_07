package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Response.MenuResponse;
import com.arkdev.z9tkvtu.model.Menu;
import com.arkdev.z9tkvtu.repository.MenuRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MenuService {
    MenuRepository menuRepository;

    public MenuResponse getMenu() {
        Menu menu = menuRepository.findById(0)
                .orElseThrow(() -> new RuntimeException("Menu not found"));
        return buildMenu(menu);
    }

    private MenuResponse buildMenu(Menu menu) {
        MenuResponse response = new MenuResponse(
                menu.getId(),
                menu.getLabel(),
                menu.getUrl(),
                menu.getDescription(),
                menu.getIcon(),
                menu.getItemId(),
                new ArrayList<>()
        );
        List<Menu> menus = menuRepository.findAllByParentOrderByOrderNumber(menu);
        for (Menu m : menus) {
            response.children().add(buildMenu(m));
        }
        return response;
    }
}
