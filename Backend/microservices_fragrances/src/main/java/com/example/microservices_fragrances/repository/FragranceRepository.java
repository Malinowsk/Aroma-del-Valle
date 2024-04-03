package com.example.microservices_fragrances.repository;

import com.example.microservices_fragrances.entity.Fragrance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FragranceRepository extends JpaRepository<Fragrance, Long> {

}
