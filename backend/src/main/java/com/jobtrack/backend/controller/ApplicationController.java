package com.jobtrack.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobtrack.backend.entity.Application;
import com.jobtrack.backend.entity.Job;
import com.jobtrack.backend.repository.ApplicationRepository;
import com.jobtrack.backend.repository.JobRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationController(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    // APPLY FOR JOB
    @PostMapping
    public Application applyForJob(
            @RequestParam Long jobId,
            @RequestBody Application application,
            Authentication authentication) {

        // Get email from JWT
        String email = authentication.getName();

        // Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        // Set application information
        application.setApplicantEmail(email);
        application.setJob(job);
        application.setStatus("Applied");

        return applicationRepository.save(application);
    }

    // GET ALL APPLICATIONS
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    // GET LOGGED-IN USER'S APPLICATIONS
    @GetMapping("/user")
    public List<Application> getUserApplications(
            Authentication authentication) {

        // Get email directly from JWT
        String email = authentication.getName();

        return applicationRepository
                .findByApplicantEmail(email);
    }

    // UPDATE APPLICATION STATUS
    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Authentication authentication) {

        // Find application
        Application application =
                applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"));

        // Get logged-in user's email
        String email = authentication.getName();

        // Make sure application belongs to user
        if (!application.getApplicantEmail()
                .equalsIgnoreCase(email)) {

            throw new RuntimeException(
                    "You cannot update this application");
        }

        // Check valid status
        if (!status.equals("Applied")
                && !status.equals("Interview")
                && !status.equals("Selected")
                && !status.equals("Rejected")) {

            throw new RuntimeException(
                    "Invalid application status");
        }

        // Update status
        application.setStatus(status);

        return applicationRepository.save(application);
    }
}