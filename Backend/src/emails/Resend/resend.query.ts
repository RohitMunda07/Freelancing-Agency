import { Resend } from "resend";

// query mail
const resend = new Resend(process.env.RESEND_API_KEY)

export enum serviceType {
    OTHERS = "others",
    SERVICE = "service"
}

export async function queryForm(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    serviceType: serviceType
    service: string;
    customService: string,
    budget?: string;
}) {
    // console.log("email data:", data);

    resend.emails.send({
        from: "onboarding@resend.dev",
        to: `${process.env.RESEND_EMAIL_TO}`,
        subject: `New Project Inquiry — ${data.name}`,

        html: `
      <div style="
        margin: 0;
        padding: 40px 20px;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
      ">

        <div style="
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        ">

          <!-- Header -->
          <div style="
            padding: 24px 28px;
            background: #0f172a;
            color: #ffffff;
          ">
            <h2 style="
              margin: 0;
              font-size: 22px;
            ">
              New Project Inquiry
            </h2>

            <p style="
              margin: 6px 0 0;
              font-size: 14px;
              color: #cbd5e1;
            ">
              Someone has submitted a project inquiry through your website.
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 28px;">

            <h3 style="
              margin: 0 0 18px;
              font-size: 17px;
              color: #111827;
            ">
              Client Details
            </h3>

            <table style="
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
            ">

              <tr>
                <td style="
                  padding: 10px 0;
                  width: 120px;
                  color: #6b7280;
                  font-weight: 600;
                  vertical-align: top;
                ">
                  Name
                </td>

                <td style="
                  padding: 10px 0;
                  color: #111827;
                ">
                  ${data.name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 10px 0;
                  color: #6b7280;
                  font-weight: 600;
                  vertical-align: top;
                ">
                  Email
                </td>

                <td style="
                  padding: 10px 0;
                ">
                  <a
                    href="mailto:${data.email}"
                    style="
                      color: #2563eb;
                      text-decoration: none;
                    "
                  >
                    ${data.email}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 10px 0;
                  color: #6b7280;
                  font-weight: 600;
                  vertical-align: top;
                ">
                  Phone
                </td>

                <td style="
                  padding: 10px 0;
                  color: #111827;
                ">
                  ${data.phone}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 10px 0;
                  color: #6b7280;
                  font-weight: 600;
                  vertical-align: top;
                ">
                  Service
                </td>

                <td style="
                  padding: 10px 0;
                  color: #111827;
                ">
                  ${data.serviceType === "service" ? data.service : data.customService}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 10px 0;
                  color: #6b7280;
                  font-weight: 600;
                  vertical-align: top;
                ">
                  Budget
                </td>

                <td style="
                  padding: 10px 0;
                  color: #111827;
                ">
                  ${data.budget || "Not specified"}
                </td>
              </tr>

            </table>

            <!-- Message -->
            <div style="
              margin-top: 24px;
              padding-top: 22px;
              border-top: 1px solid #e5e7eb;
            ">

              <h3 style="
                margin: 0 0 12px;
                font-size: 17px;
                color: #111827;
              ">
                Project Message
              </h3>

              <div style="
                padding: 16px;
                background: #f8fafc;
                border-left: 4px solid #2563eb;
                border-radius: 6px;
                font-size: 14px;
                line-height: 1.7;
                color: #374151;
                white-space: pre-wrap;
              ">
                ${data.message}
              </div>

            </div>

          </div>

          <!-- Footer -->
          <div style="
            padding: 18px 28px;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
          ">
            This inquiry was submitted through the ArisingBox website.
          </div>

        </div>

      </div>
    `,
    });
}
