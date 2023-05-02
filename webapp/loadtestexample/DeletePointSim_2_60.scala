
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class DeletePointSim extends Simulation {

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
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_1 = Map(
  		"If-None-Match" -> """W/"953f8-IWgGk6shp2ea1v9Jl8aS46Gzn9w"""",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiR0VUIiwianRpIjoiNjc0MWFkYmMtMGI4NC00ZTQ0LThkZGUtOTBmNDJkMzEwNGQ1IiwiaWF0IjoxNjgyOTgxNzI0fQ.NeK-bQjQXP3vYb1IiZC-vcI3c6putNrBAV6gcYpAof1YnEqe_p41bF0SGgoSIWLTtHMsdT5dGZ8nsO_Z5mZzBg"
  )
  
  private val headers_2 = Map(
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjg0MTkxMDY1LCJpYXQiOjE2ODI5ODE0NjUsImp0aSI6ImE0ZGJmMDVhNGU4MjVmMmYiLCJjbmYiOnsiamt0IjoiaEdTWVJRbkJiWHJSX0E5WmxsM3Njd25OTTl2TFVKR05BcXJZOTFLdi01dyJ9LCJjbGllbnRfaWQiOiI1NjRiZmQ0NjRkNmJmYjhiZGJlMjcwNjE4YWRmYjE5MCIsIndlYmlkIjoiaHR0cHM6Ly9yYXVsLWFsdi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIn0.Q7wtnsFOxvbaUVzQqVuV62bDUfxnSdlYK0oBLSotTWFzlzR1pv_sBPx6tdtDRi-BE5nhALoXNuNWGNnVfhRQjekxEvKNcX7iuoTaVCgG4kERT-KGiiXkGUjvrhNrY8mE-yle8DdY9rWIRpIdymULuX3v7RKJvy9g3-R67HinwIluc-ZHLbyeLJPUAa9hdXAg9z-vR-yA0DKkfBTpL3e6c7cD8ZXG6w2TyE3U3h0lOGtDbpVeIj3MQuCCESy9eltNG_PgX_mnpykV9RvB1-ljMA3Mkz-deYzM4Fu1swP-XBS5jpk9yRfdrjzxPdzid1icBqjUBmIdnj8MmS-2uQS_4w",
  		"content-type" -> "application/ld+json",
  		"dpop" -> "eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6Ild6ZlgwTjZVWDh3TXkzTmRSNDNtcTNsSHdUUjh1Slp1em5TOUFlSUJ5dzQiLCJ5IjoidWNmOXpLcldfLU96N1lWd1NRZWVOb1lPejNsclJNRVZWVmNWcHVhYnJlYyIsImFsZyI6IkVTMjU2In0sInR5cCI6ImRwb3Arand0In0.eyJodHUiOiJodHRwczovL3JhdWwtYWx2LnNvbGlkY29tbXVuaXR5Lm5ldC9wdWJsaWMvbG9tYXAvTWFwIiwiaHRtIjoiUFVUIiwianRpIjoiYjJmZWI2ODAtYWY3Ny00NTk4LWE0YmEtZGM1NzVlMzNkZjU2IiwiaWF0IjoxNjgyOTgxNzI1fQ.FGVn1zjlGo3109is1E-mO2LKZN7uXYpISzf1DAuV9XhFJuC-bIlcp0t2htv9LxaisaaMdZWgeW_bv3yUOCVZDQ"
  )


  private val scn = scenario("DeletePointSim")
    .exec(
      http("request_0")
        .get("/public/lomap/Map")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/public/lomap/Map")
            .headers(headers_1),
          http("request_2")
            .put("/public/lomap/Map")
            .headers(headers_2)
            .body(RawFileBody("deletepointsim/0002_request.txt"))
        )
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}
