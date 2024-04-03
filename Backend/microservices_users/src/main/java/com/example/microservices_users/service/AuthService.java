package com.example.microservices_users.service;

import com.example.microservices_users.dto.DTORequestUser;
import com.example.microservices_users.dto.DTOResponseUser;
import com.example.microservices_users.entity.Authority;
import com.example.microservices_users.entity.User;
import com.example.microservices_users.exception.EnumUserException;
import com.example.microservices_users.exception.UserException;
import com.example.microservices_users.repository.AuthorityRepository;
import com.example.microservices_users.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService( PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional
    public DTOResponseUser createUser(DTORequestUser request ) {

        if (this.userRepository.existsUsersByEmailIgnoreCase(request.getEmail()))
            throw new UserException(EnumUserException.already_exist, String.format("Ya existe un usuario con email %s", request.getEmail()));
        final var user = new User(request);

        final var authorities = new ArrayList<>(Collections.singleton(new Authority("ROLE_USER")));

        user.setAuthorities(authorities);

        final var encryptedPassword = passwordEncoder.encode( request.getPassword() );
        user.setPassword( encryptedPassword );

        final var createdUser = this.userRepository.save( user );

        return new DTOResponseUser( createdUser );
    }

}
