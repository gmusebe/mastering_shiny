# --Basic Reactivity--

library(shiny)

ui <- fluidPage(
  numericInput("a", "Input 1st integer", value = 100),
  numericInput("b", "Input 2nd integer", value = 50),
  numericInput("d", "Input 2nd integer", value = 50),
  textOutput("f")
)

server <- function(input, output, session) {
  c <- reactive(input$a + input$b)
  e <- reactive(c() + input$d)
  output$f <- renderText(e())
  
}

shinyApp(ui, server)