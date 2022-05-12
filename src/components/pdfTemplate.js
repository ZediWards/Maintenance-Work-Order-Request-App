import * as React from "react"

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image
// } from "@react-pdf/renderer"
// import { PDFViewer } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

// Create Document Component
const PdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* <Text>{props.data.status}</Text> */}
        <Text>hello</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)

export default PdfDocument
