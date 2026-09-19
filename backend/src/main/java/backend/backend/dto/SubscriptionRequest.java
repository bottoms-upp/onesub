package backend.backend.dto;

import backend.backend.entity.BillingCycle;
import backend.backend.entity.SubscriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequest {
    private String name;

    private String provider;

    private BigDecimal price;

    private BillingCycle billingCycle;

    private LocalDate renewalDate;

    private SubscriptionStatus status;

    private Long categoryId;

    private Long userId;
}
