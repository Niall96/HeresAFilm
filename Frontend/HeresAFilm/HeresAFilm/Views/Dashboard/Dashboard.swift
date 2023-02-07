//
//  Dashboard.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

struct Dashboard: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.red.opacity(0.2).ignoresSafeArea()
                VStack{
                    NavigationLink(destination: PopularMovies().navigationTitle("What's Good")) {
                        Text("Popular Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                    NavigationLink(destination: DiscoverMovies().navigationTitle("Discover")) {
                        Text("Discover Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                }
            }.navigationTitle("Home")
        }.edgesIgnoringSafeArea(.all)
    }
}

struct Dashboard_Previews: PreviewProvider {
    static var previews: some View {
        Dashboard()
    }
}
