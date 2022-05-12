# --library--
library(shiny)
ui <- fluidPage(
  
  # Name:---
  textInput("name", "What's your name?"),
  # Output:---
  textOutput("greeting")
)

server <- function(input, output, session) {
  output$greeting <- renderText({
    paste0("Hello ", input$name)
  })
}
shinyApp(ui, server)