package com.example.microservices_users.config;

import com.example.microservices_users.security.jwt.JWTFilter;
import com.example.microservices_users.security.jwt.JwtConfigurer;
import com.example.microservices_users.security.jwt.TokenProvider;
import com.example.microservices_users.constants.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {

    private final TokenProvider tokenProvider;
    private final JWTFilter jwtFilter;


    /**
     * Password encoder
     */
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity http ) throws Exception {
        http//.cors().and() // Habilitar configuración CORS
                //.csrf().disable() // Deshabilitar CSRF
                //.authorizeRequests()
                //.requestMatchers( "api/auth/authenticate", "/localhost:8007/api/auth/register").permitAll()
                //.requestMatchers("/**").permitAll(); // Permitir todas las solicitudes


                //.cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> {
                    authorize
                            //.csrf().disable() // Deshabilitar CSRF
                            .requestMatchers("/**").permitAll() // Permitir todas las solicitudes
                            .requestMatchers( "/localhost:8000/**").permitAll()
                            .requestMatchers( "/swagger-ui/**").permitAll()
                            .requestMatchers( "/v3/api-docs/**").permitAll()
                            .requestMatchers( "/localhost:3000/").permitAll()
                            .requestMatchers( "api/auth/authenticate", "/localhost:8007/api/auth/register").permitAll()


                            .requestMatchers( HttpMethod.POST, "api/users").hasRole(Constants.ADMIN)
                            .requestMatchers( HttpMethod.GET, "api/users").hasRole(Constants.ADMIN)
                            .requestMatchers( HttpMethod.DELETE,"api/users/{id}").hasRole(Constants.ADMIN)
                            .requestMatchers( HttpMethod.PUT,"api/users/{id}").hasRole(Constants.ADMIN)
                            .requestMatchers( HttpMethod.GET, "api/users/{id}").hasRole(Constants.ADMIN)

                            .anyRequest()
                            .authenticated();
                } )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(withDefaults());


        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("GET");
        configuration.addAllowedMethod("POST");
        configuration.addAllowedMethod("PUT");
        configuration.addAllowedMethod("DELETE");
        configuration.addAllowedMethod("OPTIONS");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }



    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * Para la carga de datos
     */

    @Bean
    public ResourceDatabasePopulator databasePopulator() {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new ClassPathResource("db_auth.sql"));
        return populator;
    }

}
