
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class ReviewPointSim extends Simulation {

  private val httpProtocol = http
    .baseUrl("https://raul-alv.solidcommunity.net")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.ico"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Accept" -> "application/json",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_3 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiODA2YzhjNjMtN2UxZC00ZmJmLThiMTctMjI4ZjBiNmI5N2RlIiwiaWF0IjoxNjgyOTgxNjgyfQ.jVvXZFsfR4OnRXKgjJ_hwLgRNYyaGW6UaRuA3F8sMjPIqYrGU_g28GC-IInzCtYIivbPjOoEKZ896MSlvcKyTg"
  )
  
  private val headers_4 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiMDc2ZGNiN2ItOGJmNS00Y2YyLTliNzEtMWQxODYxYzlkZTgwIiwiaWF0IjoxNjgyOTgxNjk3fQ.-Wil6cDMIcYgv5Utanf_i2EO47pSImkUVCJM6BN8plWUqBSaPfsdyJk8pLLHt_S-LAxBocGr_IViXWq14iBlLQ"
  )
  
  private val headers_5 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"content-type" -> "application/ld+json",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiUFVUIiwianRpIjoiYjY0MjcyNWUtNGMxYS00MjlkLWI3MDUtMDcwMzA0ZDcxOWVkIiwiaWF0IjoxNjgyOTgxNjk5fQ.ZcGDFAKP9htiecsFGEKv0xLw3yQtZ1iWeBreIbj6vTWAZ0gHxqy0VN4vQ3HKiHm24f_Umz0Yz7FUbnbX5s1MQw"
  )
  
  private val headers_6 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val uri2 = "https://content-signature-2.cdn.mozilla.net/chains/normandy.content-signature.mozilla.org-2023-06-09-17-30-11.chain"
  
  private val uri3 = "https://contile.services.mozilla.com/v1/tiles"
  
  private val uri4 = "https://normandy.cdn.mozilla.net/api/v1"
  
  private val uri5 = "https://classify-client.services.mozilla.com/api/v1/classify_client"

  private val scn = scenario("ReviewPointSim")
    .exec(
      http("request_0")
        .get(uri4 + "/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri5 + "/")
            .headers(headers_0),
          http("request_2")
            .get(uri2 + "?cachebust=2017-06-13-21-06")
            .headers(headers_0)
        )
    )
    .pause(3)
    .exec(
      http("request_3")
        .get("/public/lomap/Map")
        .headers(headers_3)
    )
    .pause(11)
    .exec(
      http("request_4")
        .get("/public/lomap/Map")
        .headers(headers_4)
        .resources(
          http("request_5")
            .put("/public/lomap/Map")
            .headers(headers_5)
            .body(RawFileBody("reviewpointsim/0005_request.txt"))
        )
    )
    .pause(5)
    .exec(
      http("request_6")
        .get(uri3)
        .headers(headers_6)
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}
