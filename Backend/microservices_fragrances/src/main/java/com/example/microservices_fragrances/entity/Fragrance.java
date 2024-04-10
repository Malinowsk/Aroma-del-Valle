package com.example.microservices_fragrances.entity;

import com.example.microservices_fragrances.dto.DTORequestFragrance;
import com.example.microservices_fragrances.dto.DTOResponseFragrance;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


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
    @ElementCollection
    private List<String> image = new ArrayList<String>();
    @Column
    private int installments; //cuotas
    @Column
    private float interest_on_installments; // interes por cuotas
    @Column
    private Boolean free_shipping; // envio gratis
    @Column
    private Boolean best_seller; // más vendido
    @Column
    private String description;



    public Fragrance(String name, String brand, float price, String gender, int volume, String country, String aromas,ArrayList<String> image , int installments, float interest_on_installments, boolean free_shipping ,boolean best_seller ,String description) {
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

    public Fragrance(DTORequestFragrance dto) {
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
        this.installments = dto.getInstallments();
        this.interest_on_installments = dto.getInterest_on_installments();
        this.free_shipping = dto.getFree_shipping();
        this.best_seller = dto.getBest_seller();
        this.description = dto.getDescription();
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
        this.installments = dto.getInstallments();
        this.interest_on_installments = dto.getInterest_on_installments();
        this.free_shipping = dto.getFree_shipping();
        this.best_seller = dto.getBest_seller();
        this.description = dto.getDescription();
    }

    public void addImage(String ruta){
        image.add(ruta);
    }
}
