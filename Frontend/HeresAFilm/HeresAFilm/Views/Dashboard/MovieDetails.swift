//
//  MovieDetails.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

struct MovieDetails: View {
    @StateObject private var loader: ImageLoader
    @ObservedObject private var movieManager = MovieDownloadManager()
    var movie: Movie
    init(movie: Movie) {
        self.movie = movie
        _loader = StateObject(wrappedValue: ImageLoader(url: URL(string: movie.posterPath)!, cache: Environment(\.imageCache).wrappedValue))
    }
    
    var body: some View {
        ZStack(alignment: .top) {
            backgroundView
            
            ScrollView(.vertical, showsIndicators: false) {
                VStack(alignment: .leading) {
                    headerView
                    moviePosterView
                    movieOverview
                    reviewLink
                    castInfo
                    Spacer()
                }.padding(.top, 84)
                    .padding(.horizontal, 32)
            }
        }.edgesIgnoringSafeArea(.all)
    }
    
    private var headerView: some View {
        VStack {
            Text(movie.titleWithLang)
                .font(.title)
            
            Text("Release Date: \(movie.release_date ?? "-")")
                .font(.headline)
        }.foregroundColor(.white)
    }
    
    private var moviePosterView: some View {
        HStack(alignment: .center) {
            Spacer()
            imageView.frame(width: 200, height: 320)
                .cornerRadius(20)
            Spacer()
        }
    }
    
    private var movieOverview: some View {
        Text(movie.overview ?? "-")
            .font(.body)
            .foregroundColor(.white)
            .fixedSize(horizontal: false, vertical: true)
            .padding(.top, 16)
    }
    
    private var reviewLink: some View {
        VStack {
            Divider()
            NavigationLink(destination: MovieReview(movie: movie)) {
                HStack {
                    Text("Reviews")
                        .font(.body)
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                    Spacer()
                }
            }
            Divider()
        }
    }
    
    private var castInfo: some View {
        VStack(alignment: .leading) {
            Text("CAST")
                .foregroundColor(.black)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(alignment: .top, spacing: 20) {
                    ForEach(movieManager.cast) { cast in
                        VStack {
                            AsyncImage(url: URL(string: cast.profilePhoto)!) {
                                Rectangle().foregroundColor(.gray.opacity(0.4))
                            } image: { (img) -> Image in
                                Image(uiImage: img)
                                    .resizable()
                            }
                            .frame(width: 100, height: 160)
                            .animation(.easeInOut, value: 0.5)
                            .transition(.opacity)
                            .scaledToFill()
                            .cornerRadius(15)
                            .shadow(radius: 15)
                            
                            Text("\(cast.name ?? "-") as \(cast.character ?? "-")")
                                .font(.caption)
                                .foregroundColor(.black)
                                .frame(width: 100)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                }
            }
        }.onAppear {
            movieManager.getCast(for: movie)
        }
    }
    
    private var backgroundView: some View {
        imageView.onAppear {
            loader.load()
        }
        .blur(radius: 100)
    }
    
    private var imageView: some View {
        Group {
            if loader.image != nil {
                Image(uiImage: loader.image!)
                    .resizable()
            } else {
                Rectangle().foregroundColor(.gray.opacity(0.5))
            }
        }
    }
}

struct MovieDetails_Previews: PreviewProvider {
    static var previews: some View {
        MovieDetails(movie: Movie())
    }
}
