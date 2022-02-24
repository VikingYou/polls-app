package com.example.polls.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author ycd20
 * @date 24/02/2022
 * @time 14:37
 */
@Data
@AllArgsConstructor
public class UserIdentityAvailability {

    private Boolean available;
}
