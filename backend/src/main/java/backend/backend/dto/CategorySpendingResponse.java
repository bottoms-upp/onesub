package backend.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorySpendingResponse {

    private String category;
    private BigDecimal total;
}