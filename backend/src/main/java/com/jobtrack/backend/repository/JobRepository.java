package com.jobtrack.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtrack.backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

}