// Capture Add Issuer form data into an object when the button is clicked
/* 
(function () {
  function byId(id) { return document.getElementById(id); }

  function gatherIssuerFormData() {
    return {
      name: byId('issuer-name') ? byId('issuer-name').value.trim() : '',
      taxId: byId('issuer-taxid') ? byId('issuer-taxid').value.trim() : '',
      tradeRegistryId: byId('issuer-taxid-reg') ? byId('issuer-taxid-reg').value.trim() : '',
      address: byId('issuer-address') ? byId('issuer-address').value.trim() : '',
      bankName: byId('issuer-bank-name') ? byId('issuer-bank-name').value.trim() : '',
      bankAccount: byId('issuer-bank-account') ? byId('issuer-bank-account').value.trim() : '',
      phone: byId('issuer-phone') ? byId('issuer-phone').value.trim() : '',
      email: byId('issuer-email') ? byId('issuer-email').value.trim() : '',
      website: byId('issuer-website') ? byId('issuer-website').value.trim() : ''
    };
  }

  function onAddIssuerClick(e) {
    e.preventDefault();
    const issuer = gatherIssuerFormData();
    // Save to a global variable for later use and log for quick verification
    window.latestIssuer = issuer;
    console.log('Issuer object saved:', issuer);
  }

  function init() {
    const btn = byId('add_issuer_btn');
    if (btn) {
      btn.addEventListener('click', onAddIssuerClick);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
*/

// Helper function to get an element by its ID from the DOM
function byId(id) {
    return document.getElementById(id);
  }
  
  /**
   * Gathers all input values from the "Add New Issuer" form and returns them as an object.
   *
   * This function reads the values from the following form fields by their IDs:
   *   - issuer-name: The name of the issuer (company or individual).
   *   - issuer-taxid: The tax identification number (CUI).
   *   - issuer-taxid-reg: The trade registry number (Nr. Registrul Comertului).
   *   - issuer-address: The address of the issuer (street, city, country).
   *   - issuer-bank-name: The name of the issuer's bank.
   *   - issuer-bank-account: The issuer's bank account number (IBAN).
   *   - issuer-phone: The issuer's phone number.
   *   - issuer-email: The issuer's email address.
   *   - issuer-website: The issuer's website URL.
   *
   * For each field, if the element exists, its value is trimmed and included in the returned object.
   * If a field is missing, an empty string is used as the value.
   *
   * @returns {Object} An object containing all issuer form data, e.g.:
   *   {
   *     name: "ABC Solutions SRL",
   *     taxId: "RO12345678",
   *     tradeRegistryId: "YAAAAXXXXXXJJC",
   *     address: "Bucharest, Romania",
   *     bankName: "ING BANK Romania S.A.",
   *     bankAccount: "RO66BACX0000001234567890",
   *     phone: "+40 721 123 456",
   *     email: "contact@abc.ro",
   *     website: "https://www.abc.ro"
   *   }
   */
  
  function gatherIssuerFormData() {
    return {
      name: byId("issuer-name") ? byId("issuer-name").value.trim() : "",
      taxId: byId("issuer-taxid") ? byId("issuer-taxid").value.trim() : "",
      tradeRegistryId: byId("issuer-taxid-reg")
        ? byId("issuer-taxid-reg").value.trim()
        : "",
      address: byId("issuer-address") ? byId("issuer-address").value.trim() : "",
      bankName: byId("issuer-bank-name")
        ? byId("issuer-bank-name").value.trim()
        : "",
      bankAccount: byId("issuer-bank-account")
        ? byId("issuer-bank-account").value.trim()
        : "",
      phone: byId("issuer-phone") ? byId("issuer-phone").value.trim() : "",
      email: byId("issuer-email") ? byId("issuer-email").value.trim() : "",
      website: byId("issuer-website") ? byId("issuer-website").value.trim() : "",
    };
  }
  
  const issuers = [];
  
  const addIssuerBtn = document.getElementById("add_issuer_btn");
  
  addIssuerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Add Issuer button clicked");
    const issuer = gatherIssuerFormData();
    console.log(issuer);
    issuers.push(issuer);
    console.log(issuers);
  
    const issuersJson = JSON.stringify(issuers, null, 2);
    console.log(issuersJson);
  
    // Add the new issuer to the table in issuers.html
    const tableBody = document.getElementById("issuers_tbody");
    if (tableBody) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${issuer.name}</td>
              <td>${issuer.taxId}</td>
              <td>${issuer.tradeRegistryId}</td>
              <td>${issuer.address}</td>
              <td>${issuer.bankName}</td>
              <td>${issuer.bankAccount}</td>
              <td>${issuer.phone}</td>
              <td>${issuer.email}</td>
              <td>${issuer.website}</td>
              <td>
                  <button class="btn small">✏️ Edit</button>
                  <button class="btn small danger">🗑️ Delete</button>
              </td>
          `;
      tableBody.appendChild(row);
    }
 
  });
  
  // Function to fetch issuers from json/issuers.json and display in the table
  function loadIssuersFromJson() {
    fetch('json/issuers.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch issuers.json');
        }
        return response.json();
      })
      .then(data => {
        const tableBody = document.getElementById("issuers_tbody");
        if (!tableBody) return;
        tableBody.innerHTML = ""; // Clear existing rows
        data.forEach(issuer => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${issuer.name || ""}</td>
            <td>${issuer.taxId || ""}</td>
            <td>${issuer.tradeRegistryId || ""}</td>
            <td>${issuer.address || ""}</td>
            <td>${issuer.bankName || ""}</td>
            <td>${issuer.bankAccount || ""}</td>
            <td>${issuer.phone || ""}</td>
            <td>${issuer.email || ""}</td>
            <td>${issuer.website || ""}</td>
            <td>
                <button class="btn small">✏️ Edit</button>
                <button class="btn small danger">🗑️ Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error loading issuers:', error);
      });
  }

  // Call the function on page load
  document.addEventListener("DOMContentLoaded", loadIssuersFromJson);