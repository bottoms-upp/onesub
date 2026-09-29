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
    private BigDecimal totalYearlySpend;
    private Long activeSubscriptions;
    private Long cancelledSubscriptions;
    private Long upcomingRenewals;
    private String mostExpensiveSubscription;
}