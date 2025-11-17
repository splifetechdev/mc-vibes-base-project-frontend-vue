<template>
  <div class="pdf-credit-note">
    <v-container>
      <v-card>
        <v-card-title class="headline">
          <v-icon left>mdi-file-document-outline</v-icon>
          PDF Template
        </v-card-title>

        <v-card-actions class="justify-center pa-8">
          <v-btn
            color="primary"
            x-large
            :disabled="!pdfMakeReady"
            @click="previewPDF"
            class="mx-3"
            min-width="180"
          >
            <v-icon left>mdi-eye</v-icon>
            ดูตัวอย่าง PDF
          </v-btn>
          <v-btn
            color="success"
            x-large
            :disabled="!pdfMakeReady"
            @click="downloadPDF"
            class="mx-3"
            min-width="180"
          >
            <v-icon left>mdi-download</v-icon>
            ดาวน์โหลด PDF
          </v-btn>
          <v-btn
            color="info"
            x-large
            :disabled="!pdfMakeReady"
            @click="printPDF"
            class="mx-3"
            min-width="180"
          >
            <v-icon left>mdi-printer</v-icon>
            พิมพ์ PDF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- Loading Overlay -->
    <v-overlay :value="!pdfMakeReady">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
      <p class="mt-3 white--text">กำลังโหลดระบบ PDF...</p>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "CreditNotePDF",

  props: {
    main_data: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      pdfMakeReady: false,
      // ข้อมูลจำลองสำหรับทดสอบ
      mockData: {
        main_data: {
          datashowAll: [
            [
              {
                report_type: "SO",
                report_desc: "Discount",
                report_amount: 200,
                first_item: 1,
                no: 1,
                lastdata: "lastindex",
              },
            ],
          ],
          datashowAlltimesheet: [],
          pageAll: 1,
          print_header: {
            id: "2",
            com_title: "Credit Note",
            com_eng_1: "AAAA",
            com_eng_2: "AAAA",
            com_thai: "AAAA",
            com_add_name: "AAAA",
            com_add_no: "AAAA",
            com_add_city: "AAAA",
            com_add_country: "AAAA",
            com_add_tel: "AAAA",
            com_add_email: "E-MAIL : AAAA",
            com_add_tax_id: "TAX I.D. No. AAAA",
            customer_name: "AAAA",
            addressall: "\n\n,\n\n",
            customer_address: "AAAA",
            province_invoice: "",
            country_invoice: "",
            zipcode_invoice: "",
            period_cover: "INV00001",
            customer_contact_name: "",
            customer_taxid: "0",
            inv_id: "CN00001",
            invoice_date: "08/02/2023",
            sub_total: 200,
            wth_rate: "0.00",
            tax_rate: "7.00",
            wth_rate_amount: 0,
            tax_rate_amount: 14,
            amount_total: 214,
          },
          showprint: "",
          currency_show: "USD",
          textamount_total_en: "AAAA",
          check_cus_name: true,
        },
      },
    };
  },

  computed: {
    dataToUse() {
      return this.main_data || this.mockData.main_data;
    },

    header() {
      return this.dataToUse.print_header || {};
    },

    items() {
      const datashowAll = this.dataToUse.datashowAll || [];
      const allItems = [];

      datashowAll.forEach((group) => {
        if (Array.isArray(group)) {
          group.forEach((item) => {
            allItems.push(item);
          });
        }
      });

      return allItems;
    },
  },

  mounted() {
    this.$hideLoader();
    this.waitForPdfMakeReady()
      .then(() => {
        this.pdfMakeReady = true;
        console.log("✅ pdfMake พร้อมใช้งาน");
      })
      .catch((error) => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("ไม่สามารถโหลด pdfMake ได้ กรุณาลองใหม่อีกครั้ง");
      });
  },

  methods: {
    // ====================================================================
    // ฟังชั่นรอให้ pdfMake พร้อมใช้งาน
    // ====================================================================
    waitForPdfMakeReady() {
      return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
          if (typeof pdfMake !== "undefined" && pdfMake.vfs && pdfMake.fonts) {
            clearInterval(checkInterval);
            console.log("✅ pdfMake พร้อมใช้งาน พร้อมฟอนต์ภาษาไทย");
            resolve(true);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error("pdfMake โหลดไม่สำเร็จ"));
        }, 10000);
      });
    },

    // ====================================================================
    // ฟังชั่นจัดฟอร์แมตตัวเลข
    // ====================================================================
    formatNumber(value) {
      if (!value && value !== 0) return "0.00";
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    },

    // ====================================================================
    // ฟังชั่นจัดฟอร์แมตวันที่
    // ====================================================================
    formatDate(dateString) {
      if (!dateString) return "";
      if (dateString.includes("/")) {
        return dateString;
      }

      const date = new Date(dateString);
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    // ====================================================================
    // ฟังชั่นสร้าง Title และเลขที่เอกสาร (บนสุด)
    // ====================================================================
    createTopTitle() {
      return {
        columns: [
          {
            width: "50%",
            text: this.header.com_title || "CREDIT NOTE",
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 15],
          },
          {
            width: "50%",
            text: `No. / เลขที่ : ${this.header.inv_id || "________"}`,
            fontSize: 10,
            alignment: "right",
            margin: [0, 5, 0, 15],
          },
        ],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้าง Header ของเอกสาร
    // ====================================================================
    createHeader() {
      return {
        columns: [
          // ส่วนซ้าย - ข้อมูลบริษัท
          {
            width: "50%",
            stack: [
              {
                text: this.header.com_eng_1 || "DEJ-UDOM & ASSOCIATES LTD.",
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 2],
              },
              {
                text: this.header.com_eng_2 || "ATTORNEY AT LAW",
                fontSize: 9,
                bold: true,
                margin: [0, 0, 0, 2],
              },
              {
                text:
                  this.header.com_thai ||
                  "บริษัท เดชอุดม แอนด์ แอสโซซิเอทส์ จำกัด",
                fontSize: 9,
                bold: true,
                margin: [0, 0, 0, 2],
              },
              {
                // text: "ทนายความ/ที่ปรึกษากฎหมาย",
                // fontSize: 8,
                // bold: true,
                // margin: [0, 0, 0, 0],
              },
            ],
          },
          // ส่วนขวา - ที่อยู่บริษัท
          {
            width: "50%",
            stack: [
              {
                text: `${this.header.com_add_name ||
                  "CHARN ISSARA TOWER 2"} ${this.header.com_add_no ||
                  "nd"} FLOOR, ${
                  this.header.com_add_no
                    ? this.header.com_add_no.replace(/^.*?(\d+\/\d+).*$/, "$1")
                    : "942/69"
                } RAMA IV ROAD,`,
                fontSize: 8,
                alignment: "right",
                margin: [0, 0, 0, 2],
                bold: true,
              },

              {
                text:
                  this.header.com_add_city ||
                  "KWAENG SURIYAWONG, KHET BANGRAK, BANGKOK 10500, THAILAND",
                fontSize: 8,
                alignment: "right",
                margin: [0, 0, 0, 2],
                bold: true,
              },
              {
                text:
                  this.header.com_add_tel || "Tel : 0-2233-0055, 0-2233-0068",
                fontSize: 8,
                alignment: "right",
                margin: [0, 0, 0, 2],
                bold: true,
              },
              {
                text:
                  this.header.com_add_email || "E-MAIL : account@dejudom.com",
                fontSize: 8,
                alignment: "right",
                margin: [0, 0, 0, 2],
                bold: true,
              },
              {
                text:
                  this.header.com_add_tax_id ||
                  'TAX ID. No. 0105534015348 / "HEAD OFFICE"',
                fontSize: 8,
                alignment: "right",
                bold: true,
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างเส้นคั่นหลัง Header
    // ====================================================================
    createHeaderLine() {
      return {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 545,
            y2: 0,
            lineWidth: 1,
          },
        ],
        margin: [0, 0, 0, 10],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างข้อมูลลูกค้าและเลขที่เอกสาร
    // ====================================================================
    createCustomerInfo() {
      // จัดการ address
      const addressLines = (this.header.addressall || "").split("\n");
      const filteredAddress = addressLines
        .filter((line) => line.trim() !== "" && line.trim() !== ",")
        .join(", ");

      // ใช้ customer_address ถ้า addressall ว่าง
      const displayAddress =
        filteredAddress || this.header.customer_address || "";

      // สร้างส่วนที่อยู่ลูกค้า
      const customerAddressStack = [];

      // บรรทัดแรก: ที่อยู่
      if (displayAddress) {
        customerAddressStack.push({
          text: displayAddress,
          fontSize: 8,
          margin: [0, 0, 0, 2],
        });
      } else {
        // ถ้าไม่มีที่อยู่ แสดง placeholder
        customerAddressStack.push({
          text: "Address Line 1, address line 1, address line 1,",
          fontSize: 8,
          margin: [0, 0, 0, 2],
        });
        customerAddressStack.push({
          text: "Address Line 2, address line 2, address line 2,",
          fontSize: 8,
          margin: [0, 0, 0, 2],
        });
        customerAddressStack.push({
          text: "Address Line 3, address line 3, address line 3,",
          fontSize: 8,
          margin: [0, 0, 0, 2],
        });
      }

      // เพิ่มเมือง รหัสไปรษณีย์ และประเทศ (ถ้ามี)
      const locationParts = [];
      if (this.header.province_invoice) {
        locationParts.push(this.header.province_invoice);
      }
      if (this.header.zipcode_invoice) {
        locationParts.push(this.header.zipcode_invoice);
      }
      if (this.header.country_invoice) {
        locationParts.push(this.header.country_invoice);
      }

      if (locationParts.length > 0) {
        customerAddressStack.push({
          text: locationParts.join(", "),
          fontSize: 8,
          margin: [0, 0, 0, 2],
        });
      }

      return {
        columns: [
          {
            width: "70%",
            stack: [
              {
                text: `To / ถึง:     ${this.header.customer_name ||
                  "Customer Name"}`,
                fontSize: 9,
                bold: true,
                margin: [0, 0, 0, 3],
              },
              ...customerAddressStack,
              {
                text: "",
                fontSize: 8,
                margin: [0, 0, 0, 3],
              },
              {
                text: `Tax ID:     ${this.header.customer_taxid ||
                  "___________________________"}`,
                fontSize: 9,
                margin: [0, 0, 0, 0],
              },
            ],
          },
          {
            width: "30%",
            stack: [
              {
                text: `Date / วันที่ : ${this.formatDate(
                  this.header.invoice_date
                ) || "______________"}`,
                fontSize: 9,
                alignment: "right",
                margin: [0, 0, 0, 5],
              },
              {
                text: `Invoice Ref./ อ้างอิงใบแจ้งหนี้ : ${this.header
                  .period_cover || "______________"}`,
                fontSize: 9,
                alignment: "right",
              },
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างตารางรายการ Description
    // ====================================================================
    createDescriptionTable() {
      const tableBody = [];

      // Header Row
      tableBody.push([
        {
          text: "Description / รายการ",
          fontSize: 9,
          bold: true,
          alignment: "center",
          margin: [5, 8, 5, 8],
        },
        {
          text: "Amount / จำนวนเงิน",
          fontSize: 9,
          bold: true,
          alignment: "center",
          margin: [5, 8, 5, 8],
        },
      ]);

      // Data Rows
      const minRows = 9; // ปรับจำนวนแถวเป็น 9
      for (let i = 0; i < minRows; i++) {
        if (i < this.items.length) {
          const item = this.items[i];
          tableBody.push([
            {
              text: item.report_desc || "",
              fontSize: 9,
              margin: [5, 8, 5, 8],
            },
            {
              text: item.report_amount
                ? this.formatNumber(item.report_amount)
                : "",
              fontSize: 9,
              alignment: "right",
              margin: [5, 8, 5, 8],
            },
          ]);
        } else {
          // แถวว่าง
          tableBody.push([
            {
              text: "",
              fontSize: 9,
              margin: [5, 20, 5, 20],
            },
            {
              text: "",
              fontSize: 9,
              margin: [5, 20, 5, 20],
            },
          ]);
        }
      }

      return {
        table: {
          headerRows: 1,
          widths: ["*", 150],
          body: tableBody,
        },
        layout: {
          hLineWidth: function(i, node) {
            // แสดงเส้นบนสุด, ใต้ header, และล่างสุด
            if (i === 0 || i === 1 || i === node.table.body.length) {
              return 1;
            }
            return 0;
          },
          vLineWidth: function(i, node) {
            // แสดงเส้นซ้ายสุด, ขวาสุด, และเส้นคั่นกลาง
            if (i === 0 || i === node.table.widths.length) {
              return 1;
            }
            return 1;
          },
          hLineColor: function() {
            return "black";
          },
          vLineColor: function() {
            return "black";
          },
          paddingLeft: function() {
            return 0;
          },
          paddingRight: function() {
            return 0;
          },
          paddingTop: function() {
            return 0;
          },
          paddingBottom: function() {
            return 0;
          },
        },
        margin: [0, 0, 0, 0],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างส่วนสรุปยอดเงิน
    // ====================================================================
    createSummaryTable() {
      const subTotal = this.header.sub_total || 0;
      const wthRate = this.header.wth_rate || "0.00";
      const wthAmount = this.header.wth_rate_amount || 0;
      const taxRate = this.header.tax_rate || "7.00";
      const taxAmount = this.header.tax_rate_amount || 0;
      const grandTotal = this.header.amount_total || 0;

      const summaryRows = [];

      // แถว Sub Total
      summaryRows.push([
        {
          text: "Sub Total / รวมเป็นเงิน",
          fontSize: 9,
          bold: true,
          alignment: "left",
          margin: [5, 5, 5, 5],
        },
        {
          text: this.formatNumber(subTotal),
          fontSize: 9,
          alignment: "right",
          margin: [5, 5, 5, 5],
        },
      ]);

      // แถว Less Withholding Tax
      // summaryRows.push([
      //   {
      //     text: `Less Withholding Tax / การหักภาษี ณ ที่จ่าย (${wthRate}%)`,
      //     fontSize: 9,
      //     bold: true,
      //     alignment: "left",
      //     margin: [5, 5, 5, 5],
      //   },
      //   {
      //     text: this.formatNumber(wthAmount),
      //     fontSize: 9,
      //     alignment: "right",
      //     margin: [5, 5, 5, 5],
      //   },
      // ]);

      // แถว Value Added Tax
      summaryRows.push([
        {
          text: `Value Added Tax / ภาษีมูลค่าเพิ่ม (${taxRate}%)`,
          fontSize: 9,
          bold: true,
          alignment: "left",
          margin: [5, 5, 5, 5],
        },
        {
          text: this.formatNumber(taxAmount),
          fontSize: 9,
          alignment: "right",
          margin: [5, 5, 5, 5],
        },
      ]);

      // แถว Grand Total (มีสีพื้นหลัง)
      summaryRows.push([
        {
          text: "Grand Total / ยอดรวม",
          fontSize: 9,
          bold: true,
          alignment: "left",
          margin: [5, 5, 5, 5],
        },
        {
          text: this.formatNumber(grandTotal),
          fontSize: 9,
          bold: true,
          alignment: "right",

          margin: [5, 5, 5, 5],
        },
      ]);

      // แถวแสดงยอดรวมเป็นตัวหนังสือ
      const amountText = this.dataToUse.textamount_total_en || "";
      summaryRows.push([
        {
          text: `(${amountText}) THB`,
          fontSize: 9,
          alignment: "center",
          colSpan: 2,
          fillColor: "#d8d8d8",
          margin: [5, 5, 5, 5],
        },
        {},
      ]);

      return {
        table: {
          widths: ["*", 150],
          body: summaryRows,
        },
        layout: {
          hLineWidth: function(i, node) {
            // แสดงเส้นทุกแถว
            return 1;
          },
          vLineWidth: function(i, node) {
            // แสดงเส้นซ้ายสุดและขวาสุด
            if (i === 0 || i === node.table.widths.length) {
              return 1;
            }
            return 1;
          },
          hLineColor: function() {
            return "black";
          },
          vLineColor: function() {
            return "black";
          },
          paddingLeft: function() {
            return 0;
          },
          paddingRight: function() {
            return 0;
          },
          paddingTop: function() {
            return 0;
          },
          paddingBottom: function() {
            return 0;
          },
        },
        margin: [0, 0, 0, 15],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างส่วนลายเซ็น
    // ====================================================================
    createSignatureBox() {
      return {
        columns: [
          {
            width: "50%",
            text: "",
          },
          {
            width: "50%",
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    stack: [
                      {
                        text: "",
                        margin: [0, 0, 0, 35],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 30,
                            y1: 0,
                            x2: 210,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                        margin: [0, 0, 0, 5],
                      },
                      {
                        text: "Authorized Signature / ผู้มีอำนาจลงนาม",
                        fontSize: 9,
                        alignment: "center",
                        margin: [0, 0, 0, 10],
                      },
                      {
                        text: "Date/วันที่ _______________________",
                        fontSize: 9,
                        alignment: "center",
                        margin: [0, 0, 0, 10],
                      },
                    ],
                    margin: [5, 5, 5, 5],
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function() {
                return 1;
              },
              vLineWidth: function() {
                return 1;
              },
              hLineColor: function() {
                return "black";
              },
              vLineColor: function() {
                return "black";
              },
            },
          },
        ],
        margin: [0, 0, 0, 15],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างส่วน Footer Note
    // ====================================================================
    createFooterNote() {
      return {
        stack: [
          {
            text:
              "Please send us a certificate of above withholding income tax issued to our firm together with your payment.",
            fontSize: 8,
            alignment: "center",
            margin: [0, 5, 0, 2],
          },
          {
            text:
              "โปรดส่งหนังสือรับรองการหักภาษี ณ ที่จ่ายมาพร้อมกับเงินตามรายการดังกล่าว",
            fontSize: 8,
            alignment: "center",
          },
        ],
        margin: [0, 10, 0, 0],
      };
    },

    // ====================================================================
    // ฟังชั่นสร้างเอกสาร PDF หลัก
    // ====================================================================
    generateMainCreditNote() {
      const mainContent = [];

      mainContent.push(this.createTopTitle()); // Title + No. บนสุด
      mainContent.push(this.createHeader()); // ข้อมูลบริษัท
      mainContent.push(this.createHeaderLine()); // เส้นคั่น
      mainContent.push(this.createCustomerInfo()); // ข้อมูลลูกค้า
      mainContent.push(this.createDescriptionTable()); // ตารางรายการ
      mainContent.push(this.createSummaryTable()); // สรุปยอด
      mainContent.push(this.createSignatureBox()); // ลายเซ็น
      // mainContent.push(this.createFooterNote()); // หมายเหตุ

      return mainContent;
    },

    // ====================================================================
    // ฟังชั่นสร้าง Document Definition สำหรับ pdfMake
    // ====================================================================
    generateDocDefinition() {
      const mainCreditNote = this.generateMainCreditNote();

      const docDefinition = {
        pageSize: "A4",
        pageMargins: [25, 25, 25, 25], // ลด margin ให้น้อยลง
        content: mainCreditNote,
        defaultStyle: {
          font: "Sarabun",
          fontSize: 10,
        },
      };

      return docDefinition;
    },

    // ====================================================================
    // ฟังชั่นดูตัวอย่าง PDF
    // ====================================================================
    previewPDF() {
      if (!this.pdfMakeReady) {
        alert("กรุณารอสักครู่ ระบบกำลังโหลด...");
        return;
      }

      try {
        const docDefinition = this.generateDocDefinition();
        pdfMake.createPdf(docDefinition).open();
        console.log("✅ เปิดตัวอย่าง PDF สำเร็จ");
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการสร้าง PDF: " + error.message);
      }
    },

    // ====================================================================
    // ฟังชั่นดาวน์โหลด PDF
    // ====================================================================
    downloadPDF() {
      if (!this.pdfMakeReady) {
        alert("กรุณารอสักครู่ ระบบกำลังโหลด...");
        return;
      }

      try {
        const docDefinition = this.generateDocDefinition();
        const fileName = `CreditNote_${this.header.inv_id ||
          "document"}_${this.formatDate(this.header.invoice_date) || ""}.pdf`;
        pdfMake.createPdf(docDefinition).download(fileName);
        console.log("✅ ดาวน์โหลด PDF สำเร็จ");
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการดาวน์โหลด PDF: " + error.message);
      }
    },

    // ====================================================================
    // ฟังชั่นพิมพ์ PDF
    // ====================================================================
    printPDF() {
      if (!this.pdfMakeReady) {
        alert("กรุณารอสักครู่ ระบบกำลังโหลด...");
        return;
      }

      try {
        const docDefinition = this.generateDocDefinition();
        pdfMake.createPdf(docDefinition).print();
        console.log("✅ สั่งพิมพ์ PDF สำเร็จ");
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการพิมพ์ PDF: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.pdf-credit-note {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}
</style>
