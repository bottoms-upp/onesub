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
    public DashboardSummaryResponse getSummary(@RequestParam(required = false) Long userId) {
        return dashboardService.getSummary(userId);
    }

    @GetMapping("/category-spending")
    public List<CategorySpendingResponse> getCategorySpending(@RequestParam(required = false) Long userId) {
        return dashboardService.getCategorySpending(userId);
    }

    @GetMapping("/upcoming")
    public List<UpcomingRenewalResponse> getUpcomingRenewals(@RequestParam(required = false) Long userId) {
        return dashboardService.getUpcomingRenewals(userId);
    }

    @GetMapping("/recent")
    public List<Subscription> getRecentSubscriptions(@RequestParam(required = false) Long userId) {
        return dashboardService.getRecentSubscriptions(userId);
    }
}