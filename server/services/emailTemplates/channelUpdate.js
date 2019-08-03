module.exports = (channelUpdate) => {
    console.log('channel update', channelUpdate)
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
  <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

      <title>Channel Update</title>

      <style type="text/css">
          @media screen and (max-width: 630px) {

          }
      </style>


  </head>

  <body style="padding:0; margin:0">

  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
  <tr>
      <td align="center" valign="middle">
      <h2>Center on Terrorism, Extremism, and Counterterrorism</h2>
      </td>
  </tr>
  <tr>
      <td align="center" valign="middle" style="color:#00213c;font-family: 'Amaranth'">
          <h2>Information on channel is below:</h2>
      </td>
  </tr>
  <tr>
      <td align="left" valign="middle" style="font-size: 19px; padding-left: 30px">
          <ul>
          <li>
                  <strong style="color:#00213c;font-family: 'Amaranth'">Channel Id:</strong> ${channelUpdate.channelId}
              </li>
              <li>
                  <strong style="color:#00213c;font-family: 'Amaranth'">Video Count:</strong> ${channelUpdate.videoResponse}
              </li>
              <li>
                  <strong style="color:#00213c;font-family: 'Amaranth'">Comment Count:</strong> ${channelUpdate.updatedCommentCount}
              </li>
          </ul>
      </td>
  </tr>
  <tr>
      <td align="left" valign="middle" style="padding-left: 30px">
          <h3 style="color:#00213c;font-family: 'Amaranth';">Message</h3>
          <p style="font-size: 19px;"> ${channelUpdate.errorMessage}</p>
      </td>
  </tr>
</table>

  </body>
  </html>`;
};
