package com.hms.server.repository;

import com.hms.server.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    List<Patient> findByNameContainingIgnoreCase(String name);
    Boolean existsByMob(String mobile);
    @Query("SELECT p.gender, COUNT(p.id) FROM Patient p GROUP BY p.gender")
    List<Object[]> countByGender();

    long countByLastVisitedBetween(LocalDate startDate, LocalDate endDate);


    List<Patient> findByMobContaining(String mobile);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR p.mob LIKE CONCAT('%', :keyword, '%')")
    List<Patient> findByNameContainingIgnoreCaseOrMobContaining(@Param("keyword") String keyword, @Param("keyword") String keyword2);

    List<Patient> findByGenderIgnoreCase(String gender);

    List<Patient> findByAgeBetween(Integer minAge, Integer maxAge);
}
