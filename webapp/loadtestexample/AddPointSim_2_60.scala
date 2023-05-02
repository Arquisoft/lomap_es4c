
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AddPointSim extends Simulation {

  private val httpProtocol = http
    .baseUrl("https://raul-alv.solidcommunity.net")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.ico"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .originHeader("http://localhost:3000")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/turtle",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI0OWYxOTgyNS03ZmI2LTRjMDgtYjk4Yy0yMWZhZGU4YjdiZDciLCJpYXQiOjE2ODI5ODE1NTF9.Bk7dGDAmieaQr34HrdkjJ-O_7v9egAgfwZG8hfL-bcCQ_pxfSzpTTkrXw7sVkd48c41x0y1S8tMMRgZExoprgQ"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "application/json",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_3 = Map(
  		"Access-Control-Request-Headers" -> "authorization,dpop",
  		"Access-Control-Request-Method" -> "GET",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_5 = Map(
  		"Accept" -> "image/webp,*/*",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_6 = Map(
  		"Content-Type" -> "text/plain",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_7 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_20 = Map(
  		"Accept" -> "text/turtle",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiYTkwOTdjOGQtZjhhMy00ODkyLWIxNzktZDQzNDQ3YTU4NGFkIiwiaWF0IjoxNjgyOTgxNTU0fQ.Kq2OKtkkVBGRVYk1bUlVCN4y9dLCe2HFfZzwt19pWBeUESHzdXps47To6_1t0dDYllFxxu6dKfRCjGwTdod1PA"
  )
  
  private val headers_21 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiSEVBRCIsImp0aSI6IjM5ZjQ3MjkyLTY0NjQtNDQzZC1iODJlLTkzMzExMmRlYmFiZSIsImlhdCI6MTY4Mjk4MTU1OH0.3YTrtDcSoi6WYqGnPIzJpzOloPW8vEJ852w2Ru1D06hjBPYwmYbFUR7W5D9CCh5iB4NrrBmZZo_DcTFij_GjGA"
  )
  
  private val headers_22 = Map(
  		"Access-Control-Request-Headers" -> "authorization,dpop",
  		"Access-Control-Request-Method" -> "HEAD",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_23 = Map(
  		"If-None-Match" -> """W/"953f8-IWgGk6shp2ea1v9Jl8aS46Gzn9w"""",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiYTg5OTJlYzktY2NkNS00YzkwLWFlMjItNmMxYjg5MzdlMGZjIiwiaWF0IjoxNjgyOTgxNTU0fQ.kdNW73XKH3hjeatXf19faoyCfTmsS8mpCCJHkWlrf2keFGzrXqgG_9SOQjIvWNKOACA-ABYu-ca0PZpww6P8Xg"
  )
  
  private val headers_24 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwLmFjbCIsImh0bSI6IkhFQUQiLCJqdGkiOiI5MzUwOGNhZC0yOWIwLTRlNTQtODAxYi03NjEyMDg4YjY2MzYiLCJpYXQiOjE2ODI5ODE1NjB9.dKGiRvABIFael-9jwzWfGSBEzbsxEOiq0wwv5tWjbLzndIqBgduGX4ACBBhlDG9N7iNY3DFBhSrd37hacIq4nQ"
  )
  
  private val headers_25 = Map(
  		"Accept" -> "text/turtle",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_26 = Map(
  		"Access-Control-Request-Headers" -> "authorization,content-type,dpop",
  		"Access-Control-Request-Method" -> "PUT",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_27 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"content-type" -> "application/ld+json",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAiLCJodG0iOiJQVVQiLCJqdGkiOiIwMzRjMzgwNi1mZjkzLTRmYzQtYjhkNy1lMjAxNGM3ODRlNjYiLCJpYXQiOjE2ODI5ODE1NjV9.MFDkMCJFJv7pZC4mRTPPDCsIzq_yniYWI-Ga6y-KkVbdXomLACklXcZSU7gwj-1bNFBgkk6hg5w_4DDz6g1BTg"
  )
  
  private val uri2 = "https://api.mapbox.com"
  
  private val uri3 = "https://events.mapbox.com/events/v2"

  private val scn = scenario("AddPointSim")
    .exec(
      http("request_0")
        .get("/profile/card")
        .headers(headers_0)
    )
    .pause(2)
    .exec(
      http("request_1")
        .get(uri2 + "/styles/v1/mapbox/streets-v11?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
        .headers(headers_1)
        .resources(
          http("request_2")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2.json?secure&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_1),
          http("request_3")
            .options("/public/lomap/Map")
            .headers(headers_3),
          http("request_4")
            .get(uri2 + "/styles/v1/mapbox/streets-v11/sprite.json?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_1),
          http("request_5")
            .get(uri2 + "/styles/v1/mapbox/streets-v11/sprite.png?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_5),
          http("request_6")
            .post(uri3 + "?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_6)
            .body(RawFileBody("addpointsim/0006_request.bin")),
          http("request_7")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/500/386.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_8")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/500/385.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_9")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/501/386.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_10")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/502/385.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_11")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/501/385.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_12")
            .get(uri2 + "/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/502/386.vector.pbf?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_13")
            .get(uri2 + "/fonts/v1/mapbox/DIN%20Offc%20Pro%20Bold,Arial%20Unicode%20MS%20Bold/0-255.pbf?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_14")
            .get(uri2 + "/fonts/v1/mapbox/DIN%20Offc%20Pro%20Regular,Arial%20Unicode%20MS%20Regular/0-255.pbf?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_15")
            .get(uri2 + "/fonts/v1/mapbox/DIN%20Offc%20Pro%20Medium,Arial%20Unicode%20MS%20Regular/0-255.pbf?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7),
          http("request_16")
            .get(uri2 + "/fonts/v1/mapbox/DIN%20Offc%20Pro%20Regular,Arial%20Unicode%20MS%20Regular/8192-8447.pbf?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_7)
        )
    )
    .pause(1)
    .exec(
      http("request_17")
        .post(uri3 + "?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
        .headers(headers_6)
        .body(RawFileBody("addpointsim/0017_request.bin"))
        .resources(
          http("request_18")
            .get(uri2 + "/map-sessions/v1?sku=1010ME691Kego&access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_6),
          http("request_19")
            .post(uri3 + "?access_token=pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg")
            .headers(headers_6)
            .body(RawFileBody("addpointsim/0019_request.bin")),
          http("request_20")
            .get("/public/lomap/Map")
            .headers(headers_20),
          http("request_21")
            .head("/public/lomap/Map")
            .headers(headers_21),
          http("request_22")
            .options("/public/lomap/Map.acl")
            .headers(headers_22),
          http("request_23")
            .get("/public/lomap/Map")
            .headers(headers_23),
          http("request_24")
            .head("/public/lomap/Map.acl")
            .headers(headers_24)
            .check(status.is(404)),
          http("request_25")
            .get("/profile/card")
            .headers(headers_25),
          http("request_26")
            .options("/public/lomap")
            .headers(headers_26),
          http("request_27")
            .put("/public/lomap")
            .headers(headers_27)
            .body(RawFileBody("addpointsim/0027_request.txt"))
        )
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}
