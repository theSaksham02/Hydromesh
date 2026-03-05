import 'package:flutter/material.dart';
import '../models/flood_report.dart';
import '../services/api_service.dart';

class ReportProvider with ChangeNotifier {
  List<FloodReport> _reports = [];
  bool _isLoading = false;
  String? _error;

  List<FloodReport> get reports => _reports;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Fetch all reports
  Future<void> fetchReports() async {
    _isLoading = true;
    notifyListeners();

    final result = await ApiService.get('/reports');

    _isLoading = false;
    if (result['success']) {
      _reports = (result['data'] as List)
          .map((r) => FloodReport.fromJson(r))
          .toList();
    } else {
      _error = result['error'];
    }
    notifyListeners();
  }

  // Submit report
  Future<bool> submitReport(FloodReport report) async {
    _isLoading = true;
    notifyListeners();

    final result = await ApiService.post('/reports', report.toJson());

    _isLoading = false;
    if (result['success']) {
      _reports.insert(0, FloodReport.fromJson(result['data']));
      notifyListeners();
      return true;
    } else {
      _error = result['error'];
      notifyListeners();
      return false;
    }
  }
}