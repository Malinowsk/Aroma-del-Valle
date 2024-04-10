package com.example.microservices_fragrances.dto;

import com.example.microservices_fragrances.entity.Fragrance;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class DTOResponseFragrance {
    private Long id;
    private String name;
    private String brand;
    private float price;
    private String gender;
    private int volume;
    private String country;
    private String aromas;
    private List<String> image = new ArrayList<>();
    private int installments; //cuotas
    private float interest_on_installments; // interes por cuotas
    private Boolean free_shipping; // envio gratis
    private Boolean best_seller; // más vendido
    private String description;



    public DTOResponseFragrance(Fragrance dto) {
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

    public void addImage(String ruta){
        image.add(ruta);
    }
}
