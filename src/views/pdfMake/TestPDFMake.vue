<template>
  <div class="pdf-invoice">
    <v-container>
      <v-card>
        <v-card-title class="headline">
          <v-icon left>mdi-file-document</v-icon>
          ระบบจัดการใบแจ้งหนี้แบบหลายหน้า (Multi-Page Invoice)
        </v-card-title>

        <v-card-text>
          <!-- ฟอร์มกรอกข้อมูล Invoice -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.invoiceNo"
                label="เลขที่ใบแจ้งหนี้"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.date"
                label="วันที่"
                type="date"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.customerName"
                label="ชื่อลูกค้า"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.customerPhone"
                label="เบอร์โทร"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-textarea
            v-model="invoice.customerAddress"
            label="ที่อยู่ลูกค้า"
            outlined
            rows="3"
            dense
          ></v-textarea>

          <!-- รายการสินค้า -->
          <v-divider class="my-4"></v-divider>
          <h3 class="mb-3">รายการสินค้า ({{ invoice.items.length }} รายการ)</h3>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รายการ</th>
                  <th>จำนวน</th>
                  <th>ราคา/หน่วย</th>
                  <th>รวม</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in invoice.items.slice(0, 10)"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatNumber(item.price) }}</td>
                  <td>{{ formatNumber(item.quantity * item.price) }}</td>
                  <td>
                    <v-btn icon small color="error" @click="removeItem(index)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr v-if="invoice.items.length > 10">
                  <td colspan="6" class="text-center grey--text">
                    ... และอีก {{ invoice.items.length - 10 }} รายการ (ดูใน PDF)
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-row class="mt-3">
            <v-col>
              <v-btn color="success" small @click="addItem">
                <v-icon left small>mdi-plus</v-icon>
                เพิ่มรายการ
              </v-btn>
              <v-btn
                color="info"
                small
                class="ml-2"
                @click="generateManyItems(50)"
              >
                <v-icon left small>mdi-auto-fix</v-icon>
                สร้าง 50 รายการ
              </v-btn>
              <v-btn
                color="warning"
                small
                class="ml-2"
                @click="generateManyItems(150)"
              >
                <v-icon left small>mdi-auto-fix</v-icon>
                สร้าง 150 รายการ
              </v-btn>
              <v-btn color="error" small class="ml-2" @click="clearItems">
                <v-icon left small>mdi-delete-sweep</v-icon>
                ล้างข้อมูล
              </v-btn>
            </v-col>
          </v-row>

          <!-- สรุปยอด -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-right">
              <div class="summary-box">
                <p><strong>ยอดรวม:</strong> {{ formatNumber(subtotal) }} บาท</p>
                <p><strong>VAT 7%:</strong> {{ formatNumber(vat) }} บาท</p>
                <p class="total">
                  <strong>รวมทั้งสิ้น:</strong> {{ formatNumber(total) }} บาท
                </p>
              </div>
            </v-col>
          </v-row>

          <!-- หมายเหตุ -->
          <v-textarea
            v-model="invoice.note"
            label="หมายเหตุ"
            outlined
            rows="2"
            dense
            class="mt-3"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            large
            :disabled="!pdfMakeReady"
            @click="previewPDF"
          >
            <v-icon left>mdi-eye</v-icon>
            ดูตัวอย่าง PDF
          </v-btn>
          <v-btn
            color="success"
            large
            :disabled="!pdfMakeReady"
            @click="downloadPDF"
          >
            <v-icon left>mdi-download</v-icon>
            ดาวน์โหลด PDF
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
  name: "TestPDFMake",

  data() {
    return {
      pdfMakeReady: false,
      invoice: {
        invoiceNo: "INV-2025-001",
        date: new Date().toISOString().substr(0, 10),
        customerName: "บริษัท ABC จำกัด",
        customerPhone: "02-123-4567",
        customerAddress:
          "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
        items: [],
        note: "กรุณาชำระเงินภายใน 30 วัน",
      },
    };
  },

  computed: {
    subtotal() {
      return this.invoice.items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    },
    vat() {
      return this.subtotal * 0.07;
    },
    total() {
      return this.subtotal + this.vat;
    },
  },

  mounted() {
    this.waitForPdfMake();
    // สร้างข้อมูลเริ่มต้น 10 รายการ
    this.generateManyItems(10);
    this.$hideLoader();
  },

  methods: {
    waitForPdfMake() {
      const checkInterval = setInterval(() => {
        if (typeof pdfMake !== "undefined" && pdfMake.vfs && pdfMake.fonts) {
          this.pdfMakeReady = true;
          clearInterval(checkInterval);
          console.log("✅ pdfMake พร้อมใช้งาน พร้อมฟอนต์ภาษาไทย");
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        if (!this.pdfMakeReady) {
          console.error("❌ pdfMake โหลดไม่สำเร็จ");
          alert(
            "ไม่สามารถโหลดระบบ PDF ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต"
          );
        }
      }, 10000);
    },

    addItem() {
      this.invoice.items.push({
        description: "",
        quantity: 1,
        price: 0,
      });
    },

    removeItem(index) {
      this.invoice.items.splice(index, 1);
    },

    clearItems() {
      if (confirm("ต้องการล้างข้อมูลทั้งหมดใช่หรือไม่?")) {
        this.invoice.items = [];
      }
    },

    // สร้างข้อมูลตัวอย่าง
    generateManyItems(count) {
      this.invoice.items = [];
      const productCategories = [
        "คอมพิวเตอร์",
        "โทรศัพท์มือถือ",
        "แท็บเล็ต",
        "หูฟัง",
        "ลำโพง",
        "เมาส์",
        "คีย์บอร์ด",
        "จอมอนิเตอร์",
        "ฮาร์ดดิสก์",
        "SSD",
        "RAM",
        "เมนบอร์ด",
        "การ์ดจอ",
        "ซีพียู",
        "เคส",
        "Power Supply",
        "พัดลมระบายความร้อน",
        "เว็บแคม",
        "ไมโครโฟน",
        "ปริ้นเตอร์",
      ];

      const brands = [
        "Samsung",
        "Apple",
        "Sony",
        "LG",
        "Dell",
        "HP",
        "Asus",
        "Acer",
        "Lenovo",
        "Microsoft",
        "Logitech",
        "Razer",
        "Corsair",
        "Kingston",
        "Seagate",
      ];

      for (let i = 1; i <= count; i++) {
        const category =
          productCategories[
            Math.floor(Math.random() * productCategories.length)
          ];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const model = `รุ่น ${String.fromCharCode(65 + (i % 26))}-${1000 + i}`;

        this.invoice.items.push({
          description: `${category} ${brand} ${model}`,
          quantity: Math.floor(Math.random() * 10) + 1,
          price: (Math.floor(Math.random() * 50) + 5) * 100,
        });
      }
      alert(`สร้างข้อมูล ${count} รายการเรียบร้อย`);
    },

    formatNumber(number) {
      return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    generateDocDefinition() {
      const self = this;

      // สร้างตาราง items
      const tableBody = [
        [
          { text: "ลำดับ", style: "tableHeader", alignment: "center" },
          { text: "รายการ", style: "tableHeader" },
          { text: "จำนวน", style: "tableHeader", alignment: "center" },
          { text: "ราคา/หน่วย", style: "tableHeader", alignment: "right" },
          { text: "รวม", style: "tableHeader", alignment: "right" },
        ],
      ];

      this.invoice.items.forEach((item, index) => {
        tableBody.push([
          { text: (index + 1).toString(), alignment: "center" },
          { text: item.description },
          { text: item.quantity.toString(), alignment: "center" },
          { text: this.formatNumber(item.price), alignment: "right" },
          {
            text: this.formatNumber(item.quantity * item.price),
            alignment: "right",
          },
        ]);
      });

      return {
        pageSize: "A4",
        pageMargins: [40, 80, 40, 70], // ลด margin เพื่อให้พื้นที่เนื้อหามากขึ้น

        // Header แบบกะทัดรัดสำหรับทุกหน้า
        header: function(currentPage, pageCount) {
          return {
            margin: [40, 15, 40, 10],
            columns: [
              {
                width: "60%",
                stack: [
                  {
                    text:
                      currentPage === 1
                        ? "ใบแจ้งหนี้ / INVOICE"
                        : "บริษัท ของเรา จำกัด",
                    fontSize: currentPage === 1 ? 18 : 13,
                    bold: true,
                    color: "#3f51b5",
                  },
                  currentPage === 1
                    ? {
                        text: "บริษัท ของเรา จำกัด",
                        fontSize: 11,
                        margin: [0, 2, 0, 0],
                      }
                    : null,
                ].filter((item) => item !== null),
              },
              {
                width: "40%",
                stack: [
                  {
                    text: [
                      { text: "เลขที่: ", bold: true, fontSize: 10 },
                      { text: self.invoice.invoiceNo, fontSize: 10 },
                    ],
                  },
                  {
                    text: `หน้า ${currentPage} / ${pageCount}`,
                    fontSize: 9,
                    color: "#666666",
                    margin: [0, 2, 0, 0],
                  },
                ],
                alignment: "right",
              },
            ],
          };
        },

        // Footer แยกตามหน้า
        footer: function(currentPage, pageCount) {
          if (currentPage === pageCount) {
            // Footer หน้าสุดท้าย - พิเศษ
            return {
              margin: [40, 10, 40, 15],
              stack: [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: 515,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: "#3f51b5",
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  text: "*** ขอบคุณที่ใช้บริการ ***",
                  alignment: "center",
                  fontSize: 13,
                  bold: true,
                  color: "#3f51b5",
                  margin: [0, 0, 0, 4],
                },
                {
                  text:
                    "บริษัท ของเรา จำกัด | โทร: 02-234-5678 | Email: contact@ourcompany.com",
                  alignment: "center",
                  fontSize: 8,
                  color: "#666666",
                },
              ],
            };
          } else {
            // Footer หน้าอื่นๆ - ปกติ
            return {
              margin: [40, 10, 40, 15],
              stack: [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: 515,
                      y2: 0,
                      lineWidth: 0.5,
                      lineColor: "#cccccc",
                    },
                  ],
                  margin: [0, 0, 0, 5],
                },
                {
                  columns: [
                    {
                      width: "70%",
                      text:
                        "บริษัท ของเรา จำกัด | 456 ถนนพระราม 4 กรุงเทพฯ | โทร: 02-234-5678",
                      fontSize: 8,
                      color: "#666666",
                    },
                    {
                      width: "30%",
                      text: `หน้า ${currentPage} / ${pageCount}`,
                      fontSize: 8,
                      color: "#666666",
                      alignment: "right",
                    },
                  ],
                },
              ],
            };
          }
        },

        content: [
          // ข้อมูลลูกค้า - กะทัดรัด
          {
            columns: [
              {
                width: "50%",
                stack: [
                  {
                    text: "ลูกค้า:",
                    fontSize: 10,
                    bold: true,
                    color: "#3f51b5",
                  },
                  { text: this.invoice.customerName, fontSize: 11, bold: true },
                  { text: this.invoice.customerAddress, fontSize: 9 },
                  { text: "โทร: " + this.invoice.customerPhone, fontSize: 9 },
                ],
              },
              {
                width: "50%",
                stack: [
                  {
                    text: [
                      { text: "วันที่: ", bold: true, fontSize: 10 },
                      {
                        text: this.formatDate(this.invoice.date),
                        fontSize: 10,
                      },
                    ],
                    alignment: "right",
                  },
                ],
              },
            ],
            margin: [0, 0, 0, 10],
          },

          // ตารางรายการสินค้า - ตัดหน้าอัตโนมัติ
          {
            table: {
              headerRows: 1,
              widths: [35, "*", 50, 75, 75],
              body: tableBody,
              dontBreakRows: false, // อนุญาตให้ตัดแถวข้ามหน้าได้
              keepWithHeaderRows: 1,
            },
            layout: {
              fillColor: function(rowIndex) {
                return rowIndex === 0
                  ? "#3f51b5"
                  : rowIndex % 2 === 0
                  ? "#f5f5f5"
                  : null;
              },
              hLineWidth: function(i, node) {
                return i === 0 || i === 1 || i === node.table.body.length
                  ? 1
                  : 0.5;
              },
              vLineWidth: function() {
                return 0.5;
              },
              paddingLeft: function() {
                return 5;
              },
              paddingRight: function() {
                return 5;
              },
              paddingTop: function() {
                return 3;
              },
              paddingBottom: function() {
                return 3;
              },
            },
          },

          // สรุปยอด
          {
            columns: [
              { width: "*", text: "" },
              {
                width: 180,
                stack: [
                  {
                    columns: [
                      { text: "ยอดรวม:", bold: true, fontSize: 11 },
                      {
                        text: this.formatNumber(this.subtotal) + " บาท",
                        alignment: "right",
                        fontSize: 11,
                      },
                    ],
                    margin: [0, 10, 0, 3],
                  },
                  {
                    columns: [
                      { text: "VAT 7%:", bold: true, fontSize: 11 },
                      {
                        text: this.formatNumber(this.vat) + " บาท",
                        alignment: "right",
                        fontSize: 11,
                      },
                    ],
                    margin: [0, 0, 0, 3],
                  },
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 180,
                        y2: 0,
                        lineWidth: 1,
                      },
                    ],
                    margin: [0, 3, 0, 3],
                  },
                  {
                    columns: [
                      { text: "รวมทั้งสิ้น:", bold: true, fontSize: 14 },
                      {
                        text: this.formatNumber(this.total) + " บาท",
                        alignment: "right",
                        bold: true,
                        fontSize: 14,
                        color: "#3f51b5",
                      },
                    ],
                  },
                ],
              },
            ],
            margin: [0, 8, 0, 15],
          },

          // หมายเหตุ
          {
            text: "หมายเหตุ: " + this.invoice.note,
            fontSize: 10,
            italics: true,
            margin: [0, 0, 0, 20],
          },

          // ลายเซ็น
          {
            columns: [
              {
                width: "50%",
                stack: [
                  {
                    text: "_____________________________",
                    alignment: "center",
                  },
                  {
                    text: "ผู้จัดทำ",
                    alignment: "center",
                    margin: [0, 3, 0, 0],
                    fontSize: 10,
                  },
                ],
              },
              {
                width: "50%",
                stack: [
                  {
                    text: "_____________________________",
                    alignment: "center",
                  },
                  {
                    text: "ผู้อนุมัติ",
                    alignment: "center",
                    margin: [0, 3, 0, 0],
                    fontSize: 10,
                  },
                ],
              },
            ],
            margin: [0, 15, 0, 0],
          },
        ],

        styles: {
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: "white",
            fillColor: "#3f51b5",
          },
        },

        defaultStyle: {
          font: "Sarabun",
          fontSize: 10,
        },
      };
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const months = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear() + 543}`;
    },

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

    downloadPDF() {
      if (!this.pdfMakeReady) {
        alert("กรุณารอสักครู่ ระบบกำลังโหลด...");
        return;
      }

      try {
        const docDefinition = this.generateDocDefinition();
        const fileName = `Invoice_${this.invoice.invoiceNo}_${this.invoice.date}.pdf`;
        pdfMake.createPdf(docDefinition).download(fileName);
        console.log("✅ ดาวน์โหลด PDF สำเร็จ");
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการดาวน์โหลด PDF: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.pdf-invoice {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.summary-box {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  display: inline-block;
  min-width: 300px;
}

.summary-box p {
  margin: 5px 0;
  font-size: 16px;
}

.summary-box .total {
  font-size: 20px;
  color: #3f51b5;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 2px solid #3f51b5;
}
</style>
