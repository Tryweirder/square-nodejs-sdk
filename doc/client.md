
# Client Class Documentation

The following parameters are configurable for the API Client.

| Parameter | Type | Description |
|  --- | --- | --- |
| `environment` | Environment | The API environment. <br> **Default: `Environment.Production`** |
| `accessToken` | `string` | OAuth 2.0 Access Token |

The API client can be initialized as following.

```ts
const client = new Client({

  environment: Environment.Production
})
```

## Make Calls with the API Client

```ts
import {
  ApiError,
  ApplePayApi,
  BankAccountsApi,
  CashDrawersApi,
  CatalogApi,
  CheckoutApi,
  Client,
  CustomerGroupsApi,
  CustomersApi,
  CustomerSegmentsApi,
  DevicesApi,
  DisputesApi,
  EmployeesApi,
  InventoryApi,
  InvoicesApi,
  LaborApi,
  LocationsApi,
  LoyaltyApi,
  MerchantsApi,
  MobileAuthorizationApi,
  OAuthApi,
  OrdersApi,
  PaymentsApi,
  RefundsApi,
  ReportingApi,
  SubscriptionsApi,
  TeamApi,
  TerminalApi,
  TransactionsApi,
  V1EmployeesApi,
  V1ItemsApi,
  V1LocationsApi,
  V1TransactionsApi,
} from 'squarelib';

const client = new Client({

})
const locationsApi = client.locationsApi;
try {
  const { result, ...httpResponse } = await locationsApi.listLocations();
  // Get more response info...
  // const { statusCode, headers } = httpResponse;
} catch(error) {
  if (error instanceof ApiError) {
    const errors = error.result;
    // const { statusCode, headers } = error;
  }
}
```

## SquareClient

Gateway for the SDK. This class acts as a factory for api and also holds the configuration of the SDK.

## Api

| Name | Description |
|  --- | --- |
| mobileAuthorization | Provides access to MobileAuthorizationApi |
| oAuth | Provides access to OAuthApi |
| v1Locations | Provides access to V1LocationsApi |
| v1Employees | Provides access to V1EmployeesApi |
| v1Transactions | Provides access to V1TransactionsApi |
| v1Items | Provides access to V1ItemsApi |
| applePay | Provides access to ApplePayApi |
| bankAccounts | Provides access to BankAccountsApi |
| cashDrawers | Provides access to CashDrawersApi |
| catalog | Provides access to CatalogApi |
| customers | Provides access to CustomersApi |
| customerGroups | Provides access to CustomerGroupsApi |
| customerSegments | Provides access to CustomerSegmentsApi |
| devices | Provides access to DevicesApi |
| disputes | Provides access to DisputesApi |
| employees | Provides access to EmployeesApi |
| inventory | Provides access to InventoryApi |
| invoices | Provides access to InvoicesApi |
| labor | Provides access to LaborApi |
| locations | Provides access to LocationsApi |
| reporting | Provides access to ReportingApi |
| checkout | Provides access to CheckoutApi |
| orders | Provides access to OrdersApi |
| transactions | Provides access to TransactionsApi |
| loyalty | Provides access to LoyaltyApi |
| merchants | Provides access to MerchantsApi |
| payments | Provides access to PaymentsApi |
| refunds | Provides access to RefundsApi |
| subscriptions | Provides access to SubscriptionsApi |
| team | Provides access to TeamApi |
| terminal | Provides access to TerminalApi |
