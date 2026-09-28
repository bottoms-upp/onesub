package backend.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpcomingRenewalResponse {

    private String name;
    private String provider;
    private LocalDate renewalDate;
}