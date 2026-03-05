# HydroMesh Test Plan

## 1. Overview

This document outlines the testing strategy for HydroMesh FloodNet Twin prototype.

## 2. Test Scope

### Features Tested
- F-07: Real-Time Flood Map
- F-11: Predictive Safe Routes
- F-15: Receive Help Requests
- F-17: Submit Flood Reports
- F-25: Weather API Integration

## 3. Unit Tests

### 3.1 Backend Unit Tests

| Test ID | Module | Test Description | Expected Result | Status |
|---------|--------|------------------|-----------------|--------|
| UT-B01 | User Model | Find user by email | Returns user object | ✅ Pass |
| UT-B02 | User Model | Find user by ID | Returns user object | ✅ Pass |
| UT-B03 | User Model | Handle non-existent email | Returns undefined | ✅ Pass |
| UT-B04 | Report Model | Create flood report | Returns created report | ✅ Pass |
| UT-B05 | Report Model | Find all reports | Returns array | ✅ Pass |
| UT-B06 | Report Model | Find nearby reports | Returns filtered array | ✅ Pass |
| UT-B07 | Emergency Model | Create request | Status is pending | ✅ Pass |
| UT-B08 | Emergency Model | Assign responder | Status is assigned | ✅ Pass |
| UT-B09 | Emergency Model | Update status | Status updated | ✅ Pass |

### 3.2 Frontend Unit Tests

| Test ID | Module | Test Description | Expected Result | Status |
|---------|--------|------------------|-----------------|--------|
| UT-F01 | FloodReport Model | Create from JSON | Correct parsing | ✅ Pass |
| UT-F02 | FloodReport Model | Convert to JSON | Correct format | ✅ Pass |
| UT-F03 | FloodReport Model | Handle null fields | No errors | ✅ Pass |
| UT-F04 | User Model | Create from JSON | Correct parsing | ✅ Pass |
| UT-F05 | User Model | Convert to JSON | Correct format | ✅ Pass |

### 3.3 Widget Tests

| Test ID | Widget | Test Description | Expected Result | Status |
|---------|--------|------------------|-----------------|--------|
| WT-01 | WaterLevelSelector | Display all levels | 5 options shown | ✅ Pass |
| WT-02 | WaterLevelSelector | Selection callback | Correct value returned | ✅ Pass |

## 4. Integration Tests

| Test ID | Description | Components | Expected Result | Status |
|---------|-------------|------------|-----------------|--------|
| IT-01 | Health check endpoint | API Server | Returns status ok | ✅ Pass |
| IT-02 | Get all reports | API + Database | Returns report array | ✅ Pass |
| IT-03 | Create report (auth) | API + Auth + DB | Report created | ✅ Pass |
| IT-04 | Create report (no auth) | API + Auth | 401 Unauthorized | ✅ Pass |
| IT-05 | Create emergency request | API + Auth + DB | Request created | ✅ Pass |
| IT-06 | Get weather with coords | API + Weather Service | Weather data returned | ✅ Pass |
| IT-07 | Get weather without coords | API | 400 Bad Request | ✅ Pass |

## 5. Test Execution

### Running Backend Tests
```bash
cd backend
npm test
```

### Running Frontend Tests
```bash
cd mobile
flutter test
```

## 6. Test Coverage

| Component | Coverage |
|-----------|----------|
| Backend Models | 85% |
| Backend Controllers | 70% |
| Frontend Models | 90% |
| Frontend Widgets | 60% |

## 7. Known Issues

| Issue | Description | Severity | Status |
|-------|-------------|----------|--------|
| #1 | Voice recording test fails on CI | Low | Open |