# --library--
library(shiny)

library(ggplot2)

datasets <- c("economics", "faithfuld", "seals")
ui <- fluidPage(
  selectInput("dataset", "Dataset", choices = datasets),
  verbatimTextOutput("summary"),
  tableOutput("table")
)

server <- function(input, output, session) {
  dataset <- reactive({
    get(input$dataset)
  })
  output$summary <- renderPrint({
    summary(dataset())
  })
  output$table <- renderTable({
    dataset()
  })
}

shinyApp(ui, server)