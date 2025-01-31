
export const generateTimeTableHtml = (data: any) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  try {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monday Timetable</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        color: #333;
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      h1 {
        text-align: center;
        margin-top: 20px;
        font-size: 30px;
        color: #22c55e;
        letter-spacing: 1px;
      }
      .container {
        width: 80%;
        margin: 0 auto;
        overflow-x: auto;
        padding-bottom: 40px;
      }
      .table-wrapper {
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 30px;
        margin-top: 30px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 15px;
        text-align: center;
        font-size: 1.1rem;
        border: 1px solid #ddd;
      }
      th {
        background-color: #22c55e;
        color: white;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }
      td {
        background-color: #f9f9f9;
        color: #333;
        transition: background-color 0.3s ease;
        border-bottom: 2px solid #ddd;
      }
      td:hover {
        background-color: #d1fae5;
      }
      .time {
        font-weight: bold;
        color: #22c55e;
      }
      .course {
        color: #16a34a;
        font-weight: 600;
      }
      .room {
        font-style: italic;
        color: #444;
      }
      caption {
        font-size: 1.75rem;
        color: #22c55e;
        margin-bottom: 15px;
        font-weight: 700;
        text-transform: capitalize;
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: start;
        gap: 10px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <img src="https://storage.googleapis.com/moth-cv/yamwa_logo.PNG" height="100" width="100" style="border-radius: 16px; margin-right: 5px;"/>
    <h1>${data?.program} ${days[new Date().getDay()]} Timetable</h1>
    <div class="container">
      <div class="table-wrapper">
        <table>
          <caption>
            Class Schedule
          </caption>
          <thead>
            <tr>
              <th>Time</th>
              <th>Course</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
          ${data?.content
            ?.map(
              (item: any, index: number) =>
                `
            <tr key={index}>
              <td class="time">${item?.time}</td>
              <td class="course">${item?.course}</td>
              <td class="room">${item?.location}</td>
            </tr>
            `
            )
            .join("")}
          </tbody>
        </table>
      </div>
      <div class="bottom">
        <p style="color: black; font-size: 20px;  font-weight: 900;">
          <i>Made with Yamwa!!!</i>
        </p>
      </div>
    </div>
  </body>
</html>

`;
   return html;
  } catch (error) {
  }
};
