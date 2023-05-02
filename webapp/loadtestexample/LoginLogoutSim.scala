
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginLogoutSim extends Simulation {

  private val httpProtocol = http
    .baseUrl("https://solidcommunity.net")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.ico"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_1 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_2 = Map(
  		"If-None-Match" -> """W/"4ec-vxVBKNhFUHr8QN9pUri6zdoK0cg"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_3 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Sec-Fetch-Dest" -> "document",
  		"Sec-Fetch-Mode" -> "navigate",
  		"Sec-Fetch-Site" -> "cross-site",
  		"Sec-Fetch-User" -> "?1",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_4 = Map(
  		"DPoP" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldC90b2tlbiIsImh0bSI6IlBPU1QiLCJqdGkiOiI0NGQ1NGJhZC1kMjliLTRhNTItODBmNC00ZTIwOTc3NjBkNDYiLCJpYXQiOjE2ODI5ODE4Mjh9.ymt-STGDVu5fgX3Ok4IWzOwSu-kkT1hOa4D4GBVmUg3RUwQgkMiBpn2Ej6EFSXAvMlaJ-B-JXcF0_wDPa-wuuw",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_5 = Map(
  		"If-None-Match" -> """W/"c12-Z36ZHSpfv7aY0naqiROUaAxY1zY"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_6 = Map(
  		"Accept" -> "text/turtle",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_7 = Map(
  		"Accept" -> "text/turtle",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI3MzBiZmEwMC0xODk3LTRlYjctYWNhMS0xYWYwYTNhMDUxYTEiLCJpYXQiOjE2ODI5ODE4Mjh9.jPAEogX9F5qfQZ8ckl6cwWnDwKKkh6eCIHMT5I5VdlkoTM5NQRK8RjBA2_liefDNBX2zo7YSWNsyKdPHDnA9lw"
  )
  
  private val headers_8 = Map(
  		"Accept" -> "application/json",
  		"If-None-Match" -> """W/"11236-ADI5GPKoj+cNEoMuWrCZAuPNMv4"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_9 = Map(
  		"Accept" -> "text/turtle",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiNjAzYWZlOWEtMTdiMS00Y2QwLThiNGQtNzAwNTA3YjNkM2NlIiwiaWF0IjoxNjgyOTgxODMyfQ.OKdKK2Meh3u5AVa4MEUd1MYF2PpkTGerbOh85tuP23OenysyUxeoAIB7f1nDzrXof16Oq39NBx6AC96EuFzAmQ"
  )
  
  private val headers_10 = Map(
  		"If-None-Match" -> """W/"9527c-il4RWBMoVPtpRGStehcUvVEgwd4"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiMmMxMDlhMDgtYTE1OC00YjM3LWI3NGYtOGRiZDY4OTQ1ZTc0IiwiaWF0IjoxNjgyOTgxODMyfQ.a6LK44mxDyJ4bRjS7aB34BpnSNU7v2Dpt8fEHsjkwCjUVyp68fbmZIwQeW4ss9GT6Uv6oGYofKL-C19DBTIiGQ"
  )
  
  private val headers_11 = Map(
  		"If-None-Match" -> """W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiSEVBRCIsImp0aSI6ImMzYmY0NTZkLTY4ZWMtNDc1YS04NGEzLTVmYjFiZjE2MjRmNyIsImlhdCI6MTY4Mjk4MTgzM30.K1TosJkN-ewnT2Z6RQvJlgjhRC3h5I1U4W9Wd5SHCacvEC11ep0F80bgUmu09CwByrhOsHGi92m-rJn8yulCnw"
  )
  
  private val headers_12 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwLmFjbCIsImh0bSI6IkhFQUQiLCJqdGkiOiI2MDUxYWZmYi1mNmM1LTQ2NjktYTcxMC0zZmNmMTE3Y2ZhNzYiLCJpYXQiOjE2ODI5ODE4MzR9.cYqkxlhngLv3SeEp-tK4_pxslOr_GTwL0EEO7sCjCkaVgRRkl5yIIxN8kcxdYdThB8Laeynan5Ylht4GzPmp6Q"
  )
  
  private val headers_14 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxNDI4LCJpYXQiOjE2ODI5ODE4MjgsImp0aSI6IjA2Mjk2NjQzMDNkMTIyMjQiLCJjbmYiOnsiamt0IjoiWlMwd0NBWEdZeWJNYkktZUVoLTVzcHlnSXV2Y1RsNHk4aVcwQ1RIeWRUWSJ9LCJjbGllbnRfaWQiOiJkZmJlMmY2M2FjNDA1NjgyNjEyYjBhMjAwMmM3NDJiMSIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.rlZAiCApuLmsP-YulJagxRjEPuLF3mJ6dE1ZtXNfDmzBPLqVzsSDBJ7vkrA9oy0AROR083uoxgNOB8ArQUximvpBQ_EwVVjy59QAy-TjRp9v8ZVpyLQowlgYMwF7rSSZH-EOJkixKvAS8jU0rPrP0bEA7j-jiCQmQ6PesQGCIxcapBeoiYUBaLV_rdMiJ7bpdBef8l27zBHE9FjU27iz8V3KSEHNNTi9I0gb8UfhpOaCiBZtQMWyh4giaGlQK0v_WimrMIQjoZTHMHu32SDbDcihSVkmpHhgXRLSdg6_4kTrYSobwkMKP1dKu1YJBVHMJMBsX1A3_Kf6o1YJ8LF-cQ",
  		"content-type" -> "application/ld+json",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Im1QUHN5TFZNWEVuZFk1RnJyZm5oanVNS2ljZU4tdVAwYy1iY2VTc2ZJV2ciLCJ5IjoiYjRwc19wWUNkTEdiZnlBbFdSUWRPNE9GUTF1SjVueGVxMzE3MzB5UTMwOCIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAiLCJodG0iOiJQVVQiLCJqdGkiOiI0ZTAxYTE1OC1hYjJhLTQyOWItOWJhOS1lNGY5ZjIwYTUzOTQiLCJpYXQiOjE2ODI5ODE4MzR9.qJzUSRhIAeMY-HOpDNUaHNj0pRAeOp6sheX0QNX3xncOujKxe2VAJZN46DKwvghuy4-sR-DjZwZbMGR8zze6yg"
  )
  
  private val headers_15 = Map(
  		"Content-Type" -> "text/plain",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val uri1 = "https://raul-alv.solidcommunity.net"
  
  private val uri2 = "https://api.mapbox.com"
  
  private val uri4 = "https://events.mapbox.com/events/v2"

  private val scn = scenario("LoginLogoutSim")
    .exec(
      http("request_0")
        .get("/.well-known/openid-configuration")
        .headers(headers_0)
        .resources(
          http("request_1")
            .post("/register")
            .headers(headers_1)
            .body(RawFileBody("loginlogoutsim/0001_request.json")),
          http("request_2")
            .get("/.well-known/openid-configuration")
            .headers(headers_2),
          http("request_3")
            .get("/authorize?client_id=dfbe2f63ac405682612b0a2002c742b1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile&response_type=code&scope=openid%20offline_access%20webid&state=75428a3c15a34e5e8ad0dfa2e6ed3270&code_challenge=8WiAvJrldRrISjbTwkdwSLrDBIyjE5k0HHXKu2ozlxE&code_challenge_method=S256&prompt=consent&response_mode=query")
            .headers(headers_3),
          http("request_4")
            .post("/token")
            .headers(headers_4)
            .formParam("grant_type", "authorization_code")
            .formParam("redirect_uri", "http://localhost:3000/profile")
            .formParam("code", "18fc7c6e0c67c680fc4b2b97bb1f6efc")
            .formParam("code_verifier", "0edd4095463a4f709b34af933cad6f171cdfe501b30a49dea43e74511d794e08a5f738b05b4845ed8a5aa04c72a58277")
            .formParam("client_id", "dfbe2f63ac405682612b0a2002c742b1")
            .basicAuth("dfbe2f63ac405682612b0a2002c742b1","d165c32941588f856785576e6bda71e8"),
          http("request_5")
            .get("/jwks")
            .headers(headers_5),
          http("request_6")
            .get(uri1 + "/profile/card")
            .headers(headers_6),
          http("request_7")
            .get(uri1 + "/profile/card")
            .headers(headers_7)
        )
    )
    .pause(3)
    .exec(
      http("request_8")
        .get(uri2 + "/styles/v1/mapbox/streets-v11?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
        .headers(headers_8)
        .resources(
          http("request_9")
            .get(uri1 + "/public/lomap/Map")
            .headers(headers_9),
          http("request_10")
            .get(uri1 + "/public/lomap/Map")
            .headers(headers_10),
          http("request_11")
            .head(uri1 + "/public/lomap/Map")
            .headers(headers_11),
          http("request_12")
            .head(uri1 + "/public/lomap/Map.acl")
            .headers(headers_12)
            .check(status.is(404)),
          http("request_13")
            .get(uri1 + "/profile/card")
            .headers(headers_6),
          http("request_14")
            .put(uri1 + "/public/lomap")
            .headers(headers_14)
            .body(RawFileBody("loginlogoutsim/0014_request.txt")),
          http("request_15")
            .get(uri2 + "/map-sessions/v1?sku=101YSdAeo92dy&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_15),
          http("request_16")
            .post(uri4 + "?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_15)
            .body(RawFileBody("loginlogoutsim/0016_request.bin")),
          http("request_17")
            .post(uri4 + "?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_15)
            .body(RawFileBody("loginlogoutsim/0017_request.bin"))
        )
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}
