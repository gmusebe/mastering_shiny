# --Exercise!--
library(shiny)

ui <- fluidPage(
  textInput("name", "What is your name", value = "Your name")
)

server <- function(input, output, session) {
  
}
  
shinyApp(ui, server)