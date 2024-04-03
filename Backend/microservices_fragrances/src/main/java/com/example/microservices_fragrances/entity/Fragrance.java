package com.example.microservices_fragrances.entity;

import com.example.microservices_fragrances.dto.DTORequestFragrance;
import com.example.microservices_fragrances.dto.DTOResponseFragrance;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@NoArgsConstructor
@Data
public class Fragrance implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_fragrance")
    private Long id;
    @Column
    private String name;
    @Column
    private String brand;
    @Column
    private float price;
    @Column
    private String gender;
    @Column
    private int volume;
    @Column
    private String country;
    @Column
    private String aromas;
    @Column
    private String image;

    public Fragrance(String name, String brand, float price, String gender, int volume, String country, String aromas,String image) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.gender = gender;
        this.volume = volume;
        this.country = country;
        this.aromas = aromas;
        this.image = image;
    }

    public Fragrance(DTORequestFragrance dto) {
        this.name = dto.getName();
        this.brand = dto.getBrand();
        this.price = dto.getPrice();
        this.gender = dto.getGender();
        this.volume = dto.getVolume();
        this.country = dto.getCountry();
        this.aromas = dto.getAromas();
        //this.image = dto.getImage();
    }
    public Fragrance(DTOResponseFragrance dto) {
        this.id = dto.getId();
        this.name = dto.getName();
        this.brand = dto.getBrand();
        this.price = dto.getPrice();
        this.gender = dto.getGender();
        this.volume = dto.getVolume();
        this.country = dto.getCountry();
        this.aromas = dto.getAromas();
        //this.image = dto.getImage();
    }

    public Fragrance(Fragrance dto) {
        this.id = dto.getId();
        this.name = dto.getName();
        this.brand = dto.getBrand();
        this.price = dto.getPrice();
        this.gender = dto.getGender();
        this.volume = dto.getVolume();
        this.country = dto.getCountry();
        this.aromas = dto.getAromas();
        this.image = dto.getImage();
    }
}
