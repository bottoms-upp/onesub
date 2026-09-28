package backend.backend.controller;

import backend.backend.dto.CategorySpendingResponse;
import backend.backend.dto.DashboardSummaryResponse;
import backend.backend.dto.UpcomingRenewalResponse;
import backend.backend.entity.Subscription;
import backend.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {
        return dashboardService.getSummary();
    }

    @GetMapping("/category-spending")
    public List<CategorySpendingResponse> getCategorySpending() {
        return dashboardService.getCategorySpending();
    }

    @GetMapping("/upcoming")
    public List<UpcomingRenewalResponse> getUpcomingRenewals() {
        return dashboardService.getUpcomingRenewals();
    }

    @GetMapping("/recent")
    public List<Subscription> getRecentSubscriptions() {
        return dashboardService.getRecentSubscriptions();
    }
}