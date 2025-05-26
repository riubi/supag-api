### Technical Requirements for Project: Pages

#### Authentication Pages

* **Login**

  * Inputs: Email, Password

* **Reset Password**

  * Sends email containing temporary password or reset link (similar to rw\.by implementation)

#### Registration Page

* User selects role: Customer (`isCustomer`) or Supplier.

**For Customer:**

* Fields:

  * Tax ID (validated via nalog.gov or kartoteka.by API)
  * Email
  * Password
  * Establishments (multiple entries allowed)

    * Each establishment includes:

      * Name
      * Address

**For Supplier:**

* Fields:

  * Tax ID  (validated via nalog.gov or kartoteka.by API)
  * Email
  * Password

* Post-registration email verification with 4-digit confirmation code sent to user's email.

#### Profile Page

* Common profile for Customers and Suppliers:

  * Tax ID
  * Short name
  * Full name
  * Payer's address
  * Registration date

* Actions available:

  * Change Password
  * Change Email
  * Delete Account

* Customers can add new establishments (name, address).

#### Notifications

* Real-time notifications triggered by:

  * Supplier creating new product.
  * Supplier changing product price.

#### Product Management

* **Product Creation (Supplier)**:

  * Guided entry (autocomplete from existing product DB or ChatGPT-assisted input).
  * Considerations for quantity management/control (reference complexbar.by for implementation ideas).

* **Main Page**:

  * Product display organized as Type → Category → SubCategory.
  * Product cards include:

    * Option to add product to a comparative summary table (restricted access or premium feature for Suppliers).
    * Customers can add products to Favorites.

#### Summary Table

* Comparative view of product prices and suppliers for Customers.
* Optional premium feature for Suppliers.

#### Supplier Product Management (CRUD)

* Table/List view with:

  * Batch deletion
  * Filtering by price and name
  * Export options: XML, Excel (xls/xlsx)

* Advanced import functionality from Excel (future consideration beyond MVP).

#### Support Page

* Contact email and FAQ section

#### Schema

* Products structured according to predefined schema:

  * [Categories Schema Reference](https://github.com/marinaweit/PUP/blob/main/src/app/shared/constants/categories.const.ts)

#### External APIs

* Tax ID validation via nalog.gov or kartoteka.by (50 BYN/month subscription).
* Retrieve bank account information potentially via API integration (reference method similar to platform 7745).

#### Technical Notes

* Ensure secure and compliant handling of user data.
* Consider performance implications of real-time notifications and data-intensive summary tables.
