package com.example.polls.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:33
 */
@Data
public class ChoiceRequest {
    @NotBlank
    @Size(max = 40)
    private String text;
}
