import {
  Document,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { APIRoute } from 'astro';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export const GET: APIRoute = async () => {
  try {
    // Create a simple test document
    const TestDocument = React.createElement(
      Document,
      {},
      React.createElement(
        Page,
        { size: 'A4', style: styles.page },
        React.createElement(
          View,
          {},
          React.createElement(Text, { style: styles.title }, 'Test PDF'),
          React.createElement(
            Text,
            { style: styles.text },
            'This is a test PDF document.'
          ),
          React.createElement(Text, { style: styles.text }, 'Code: 1234'),
          React.createElement(
            Text,
            { style: styles.text },
            'Generated at: ' + new Date().toISOString()
          )
        )
      )
    );

    // Render to buffer
    const pdfBuffer = await renderToBuffer(TestDocument);

    // Return as download
    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="test-simple.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
