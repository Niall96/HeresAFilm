//
//  MovieReview.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

struct MovieReview: View {
    var movie: Movie
    
    @ObservedObject var movieReviewManager: MovieReviewsManager
    
    init(movie: Movie) {
        self.movie = movie
        self.movieReviewManager = MovieReviewsManager(movie: movie)
        
        UITableView.appearance().separatorStyle = .none
        UITableView.appearance().backgroundColor = .clear
        UITableViewCell.appearance().backgroundColor = .clear
    }
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.black.opacity(0.7)
            
            List {
                ForEach(movieReviewManager.reviews) { review in
                    VStack {
                        Text(review.author ?? "")
                            .font(.title)
                            .bold()
                        
                        Text(review.content ?? "")
                            .font(.body)
                            .lineLimit(nil)
                            }.foregroundColor(.white)
                        .listRowBackground(Color.clear)
                }
            }.onAppear {
                movieReviewManager.getMovieReviews()
            }
            .padding(.horizontal, 32)
        }.edgesIgnoringSafeArea(.all)
    }
    
}
