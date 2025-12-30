package com.suplearn.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                // Public endpoints - anyone can access
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/resources/public/**").permitAll()
                .antMatchers("/api/resources/upload/anonymous").permitAll()
                .antMatchers("/api/resources/search").permitAll()
                .antMatchers("/api/resources/view/**").permitAll()
                .antMatchers("/api/resources/download/**").permitAll()
                .antMatchers("/api/years/**").permitAll()
                .antMatchers("/api/modules/**").permitAll()
                .antMatchers("/api/subjects/**").permitAll()
                .antMatchers("/api/ratings/resource/**").permitAll()
                .antMatchers("/api/comments/resource/**").permitAll()
                // Student endpoints
                .antMatchers("/api/student/**").hasRole("STUDENT")
                .antMatchers("/api/quizzes/user/**").hasRole("STUDENT")
                .antMatchers("/api/progress/**").hasRole("STUDENT")
                .antMatchers("/api/schedule/**").hasRole("STUDENT")
                // Professor endpoints
                .antMatchers("/api/professor/**").hasRole("PROFESSOR")
                .antMatchers("/api/quizzes/create").hasRole("PROFESSOR")
                // Admin endpoints
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                // Any other request must be authenticated
                .anyRequest().authenticated();
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
