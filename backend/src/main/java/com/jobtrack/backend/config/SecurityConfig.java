package com.jobtrack.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // Disable CSRF because we are using JWT
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(cors -> {})

            // Do not create server sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // =========================
                // CORS
                // =========================
                .requestMatchers(
                    HttpMethod.OPTIONS,
                    "/**"
                ).permitAll()

                // =========================
                // AUTH
                // =========================
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register"
                ).permitAll()

                // =========================
                // CURRENT USER
                // =========================
                .requestMatchers(
                    "/api/auth/me"
                ).authenticated()

                // =========================
                // JOBS
                // =========================
                .requestMatchers(
                    "/api/jobs/**"
                ).permitAll()

                // =========================
                // AI CHATBOT
                // =========================
                .requestMatchers(
                    "/api/ai/**"
                ).permitAll()

                // =========================
                // APPLICATIONS
                // =========================
                .requestMatchers(
                    "/api/applications/**"
                ).authenticated()

                // =========================
                // EVERYTHING ELSE
                // =========================
                .anyRequest().authenticated()
            )

            // Disable form login
            .formLogin(form ->
                form.disable()
            )

            // Disable basic authentication
            .httpBasic(basic ->
                basic.disable()
            )

            // JWT filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}