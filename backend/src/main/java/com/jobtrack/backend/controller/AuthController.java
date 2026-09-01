package com.jobtrack.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.jobtrack.backend.config.JwtService;
import com.jobtrack.backend.entity.User;
import com.jobtrack.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        User savedUser =
                userRepository.save(user);

        // Don't return password
        savedUser.setPassword(null);

        return ResponseEntity.ok(savedUser);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid email or password");
        }

        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid email or password");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return ResponseEntity.ok(token);
    }


    // =========================
    // GET CURRENT USER
    // =========================

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            Authentication authentication) {

        String email =
                authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        // Never send password
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }


    // =========================
    // UPDATE PROFILE
    // =========================

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody User profileData,
            Authentication authentication) {

        String email =
                authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        // Update basic information
        if (profileData.getName() != null) {
            user.setName(
                    profileData.getName()
            );
        }

        if (profileData.getPhone() != null) {
            user.setPhone(
                    profileData.getPhone()
            );
        }

        if (profileData.getLocation() != null) {
            user.setLocation(
                    profileData.getLocation()
            );
        }

        if (profileData.getJobTitle() != null) {
            user.setJobTitle(
                    profileData.getJobTitle()
            );
        }

        if (profileData.getEducation() != null) {
            user.setEducation(
                    profileData.getEducation()
            );
        }

        if (profileData.getSkills() != null) {
            user.setSkills(
                    profileData.getSkills()
            );
        }

        if (profileData.getSummary() != null) {
            user.setSummary(
                    profileData.getSummary()
            );
        }

        // Social links
        if (profileData.getLinkedin() != null) {
            user.setLinkedin(
                    profileData.getLinkedin()
            );
        }

        if (profileData.getGithub() != null) {
            user.setGithub(
                    profileData.getGithub()
            );
        }

        // Career preferences
        if (profileData.getPreferredJobType() != null) {
            user.setPreferredJobType(
                    profileData.getPreferredJobType()
            );
        }

        if (profileData.getPreferredLocation() != null) {
            user.setPreferredLocation(
                    profileData.getPreferredLocation()
            );
        }

        if (profileData.getExpectedSalary() != null) {
            user.setExpectedSalary(
                    profileData.getExpectedSalary()
            );
        }

        User updatedUser =
                userRepository.save(user);

        // Never send password
        updatedUser.setPassword(null);

        return ResponseEntity.ok(updatedUser);
    }
}