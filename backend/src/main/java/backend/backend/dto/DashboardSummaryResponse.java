package backend.backend.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private BigDecimal totalMonthlySpend;
    private Long activeSubscriptions;
    private Long upcomingRenewals;
    private String mostExpensiveSubscription;
}