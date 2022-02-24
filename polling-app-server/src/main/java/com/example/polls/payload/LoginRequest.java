package com.example.polls.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 15:08
 */
@Data
public class LoginRequest {
    @NotBlank
    private String usernameOrEmail;
    @NotBlank
    private String password;
}
