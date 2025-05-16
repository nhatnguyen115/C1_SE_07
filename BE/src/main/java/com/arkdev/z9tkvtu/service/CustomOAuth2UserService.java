package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.model.Role;
import com.arkdev.z9tkvtu.model.UserLoginData;
import com.arkdev.z9tkvtu.repository.RoleRepository;
import com.arkdev.z9tkvtu.repository.UserLoginDataRepository;
import com.arkdev.z9tkvtu.util.RoleType;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    UserLoginDataRepository userLoginDataRepository;
    RoleRepository roleRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        Map<String,Object> attributes = oAuth2User.getAttributes();
        String providerName = userRequest.getClientRegistration().getRegistrationId();
        String email = (String) attributes.get("email");
        Optional<UserLoginData> existingUser = userLoginDataRepository.findByEmail(email);

        return existingUser.map(userLoginExternal ->
                processExistingUser(existingUser.get(), attributes)).orElseGet(() ->
                registerNewUser(attributes, providerName));
    }

    private OAuth2User registerNewUser(Map<String, Object> attributes, String providerName) {
        UserLoginData userLoginData = new UserLoginData();
        switch (providerName.toLowerCase()) {
            case "google":
                userLoginData.setFirstName((String) attributes.get("given_name"));
                userLoginData.setLastName((String) attributes.get("family_name"));
                break;
            case "facebook":
                userLoginData.setFirstName((String) attributes.get("first_name"));
                userLoginData.setLastName((String) attributes.get("last_name"));
                break;
        }
        userLoginData.setActive(true);
        userLoginData.setEmail((String) attributes.get("email"));
        Role role = roleRepository.findByRoleType(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        userLoginData.setRole(role);
        userLoginDataRepository.save(userLoginData);

        return createOAuth2User(userLoginData, attributes);
    }

    private OAuth2User processExistingUser(UserLoginData userLoginData,
                                           Map<String, Object> attributes) {
        return createOAuth2User(userLoginData, attributes);
    }

    private OAuth2User createOAuth2User(UserLoginData userLoginData,
                                        Map<String, Object> attributes) {
        return new DefaultOAuth2User(
                userLoginData.getAuthorities(),
                attributes,
                "name");
    }
}
