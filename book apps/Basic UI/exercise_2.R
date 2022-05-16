# --Exercise!--
library(shiny)

ui <- fluidPage(
  sliderInput(
    "period", "Whe should we deliver",
    min = as.Date("2020-09-15","%Y-%m-%d"),
    max = as.Date("2020-09-23","%Y-%m-%d"),
    value=as.Date("2020-09-17"),
    timeFormat="%Y-%m-%d"
  )
)

server <- function(input, output, session) {
  
}

shinyApp(ui, server)