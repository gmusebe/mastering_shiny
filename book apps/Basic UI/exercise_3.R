# --range--
library(shiny)

ui <- fluidPage(
  sliderInput(
    "range", "Select range",
    min = 0,
    max = 100,
    value = 5,
    step = 5
  ),
  actionButton(
    "click", "Click me !",
    icon = icon("play"), class = "btn-lg btn-success"
    )
)

server <- function(input, output, session) {
  
}

shinyApp(ui, server)