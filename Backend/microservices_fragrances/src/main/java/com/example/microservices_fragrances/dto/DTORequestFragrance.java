package com.example.microservices_fragrances.dto;

import com.example.microservices_fragrances.entity.Fragrance;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DTORequestFragrance {

    @Min(value = 0, message = "ID must be greater than 0")
    @NotNull(message = "ID cannot be null")
    private Long id;
    private String name;
    private String brand;
    private float price;
    private String gender;
    private int volume;
    private String country;
    private String aromas;
    private MultipartFile[] image;
    private int installments; //cuotas
    private float interest_on_installments; // interes por cuotas
    private Boolean free_shipping; // envio gratis
    private Boolean best_seller; // más vendido
    private String description;

    public DTORequestFragrance(String name, String brand, float price, String gender, int volume, String country, String aromas,MultipartFile[] image, int installments, float interest_on_installments, boolean free_shipping ,boolean best_seller ,String description) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.gender = gender;
        this.volume = volume;
        this.country = country;
        this.aromas = aromas;
        this.image = image;
        this.installments = installments;
        this.interest_on_installments = interest_on_installments;
        this.free_shipping = free_shipping;
        this.best_seller = best_seller;
        this.description = description;

    }

    public DTORequestFragrance(Fragrance dto) {
        this.id = dto.getId();
        this.name = dto.getName();
        this.brand = dto.getBrand();
        this.price = dto.getPrice();
        this.gender = dto.getGender();
        this.volume = dto.getVolume();
        this.country = dto.getCountry();
        this.aromas = dto.getAromas();
        //this.image = dto.getImage();
        this.installments = dto.getInstallments();
        this.interest_on_installments = dto.getInterest_on_installments();
        this.free_shipping = dto.getFree_shipping();
        this.best_seller = dto.getBest_seller();
        this.description = dto.getDescription();
    }
}
