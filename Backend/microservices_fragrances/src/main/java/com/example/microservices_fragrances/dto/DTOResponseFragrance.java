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
    private String image;


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
    }
}
